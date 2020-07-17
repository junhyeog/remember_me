# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 09:35:41 2020

@author: antemrdm
"""

import pandas as pd
import pymongo as mongo
import re
import datetime


def naive_dic():
    d = {}
    d.setdefault('group', 'korwar')
    d.setdefault('name_kor', None)
    d.setdefault('name_chi', None)
    d.setdefault('birth_year', None)
    d.setdefault('birth_month', None)
    d.setdefault('birth_day', None)
    d.setdefault('death_year', None)
    d.setdefault('death_month', None)
    d.setdefault('death_day', None)
    d.setdefault('place', None)
    d.setdefault('serial', None)
    d.setdefault('kind', None)
    d.setdefault('unit', None)
    d.setdefault('rank', None)
    d.setdefault('detail', None)
    d.setdefault('source', '군사편찬연구소')
    return d


def parse_r(r):
    d = naive_dic()
    for idx, data in enumerate(r):
        if idx < 3:
            continue
        elif idx == 3:  # 'name_kor, name_chi'
            try:
                kor_row = re.compile('[(]+.*[)]+').sub('', data)
                kor_row = re.compile('\S+').findall(kor_row)
                kor = ''
                for i in kor_row:
                    kor += i
                chi_row = re.compile('[(].*[)]').findall(data)[0][1:-1]
                chi_row = re.compile('\S+').findall(chi_row)
                chi = ''
                for i in chi_row:
                    chi += i
                if len(re.compile('[^|가-힣|\s|a-z|A-Z]+').sub('', chi)) > 0:
                    return False
                if (len(kor) == len(chi)):
                    d['name_kor'] = kor
                    d['name_chi'] = chi
                else:
                    return False
            except:
                #                print('name_chi error', idx, data)
                return False
        elif idx == 5:  # rank
            try:
                d['rank'] = data.rstrip().lstrip()
            except:
                # print(data)
                return False
        elif idx == 6:  # birth
            try:
                [d['birth_year'], d['birth_month'], d['birth_day']] = [
                    int(i) for i in data.split('-')]
                if d['birth_year'] < 1800 or d['birth_year'] > 2019:
                    return False
            except:
                return False
                # print('birth error', idx, data)
        elif idx == 7:  # place
            try:
                if len(re.compile('\D').sub('', data.rstrip().lstrip())) > 0:
                    return False
                data = re.compile('[^|가-힣\s]+').sub('', data)
                data = data.replace('원주면', '원주면 ')
                data = data.replace('강우너도', '강원도')
                data = ' '.join(data.rstrip().lstrip().split())
                if data[-1] == '에' or data[-1] == '서' or '현재는' in data or data[0]=='라':
                    return False
                d['place'] = data
            except:
                return False
                # print(data)
        elif idx == 8:
            try:
                data = ''.join(data.rstrip().lstrip().split())
                if len(re.compile('[^|가-힣\s]+').sub('', data)) <= 0:
                    return False
                d['kind'] = data
            except:
                return False
                # print(data)
        elif idx == 9:
            try:
                data = data.replace('경찰', ' 경찰')
                data = data.replace(', ', '')
                data = data.rstrip().lstrip()
                data = ' '.join(data.split())
                if len(re.compile('[^|가-힣\s]+').sub('', data)) <= 0:
                    return False
                d['unit'] = data

            except:
                return False
                # print(data)
        elif idx == 10:
            try:
                [d['death_year'], d['death_month'], d['death_day']] = [
                    int(i) for i in data.split('-')]
                if d['death_year'] < 1800 or d['death_year'] > 2019:
                    return False
            except:
                return False
                # print('death error', idx, data)
        elif idx == 11:
            try:
                d['detail'] = data.rstrip().lstrip()
            except:
                return False
    try:
        # 날짜 정보
        birth = datetime.datetime(
            d['birth_year'], d['birth_month'], d['birth_day'])
        death = datetime.datetime(
            d['death_year'], d['death_month'], d['death_day'])
        if (death-birth).days < 10*365:
            return False
        # 계급 정보
        rank = d['rank']
        if rank[-2:] == '증사':
            d['rank'] = rank[:-2]+'중사'
        if rank == '일등중ㅇ사':
            d['rank'] = '일등중사'
        if rank == '이등중ㅅ':
            d['rank'] = '이등중사'
        if rank == '일등벼':
            d['rank'] = '일등병'
        if rank[-2:] == '군번':
            return False
        if len(re.compile('\D').sub('', rank)) > 0:
            return False
        # 부대 정보
        unit = d['unit']
        if unit[-1] == '에' or unit[-2:] == '에서' or unit[-2:] == '으로':
            d['unit'] = unit[:-1]
    except:
        return False
    return d


def checkP(p):
    if not p:
        return False
    if not p['name_kor']:
        return False
    elif len(p['name_kor']) < 2:
        return False
    else:
        return True


def test(patrtc_list):
    name = set()
    place = set()
    date = set()
    kind = set()
    unit = set()
    rank = set()
    for p in patrtc_list:
        name.add(p['name_kor'] + p['name_chi'])
        place.add(p['place'])
        date.add(str(p['birth_year'])+'.'+str(p['birth_month'])+'.'+str(p['birth_day']) +
                 '. - '+str(p['death_year'])+'.'+str(p['death_month'])+'.'+str(p['death_day'])+'.')
        kind.add(p['kind'])
        unit.add(p['unit'])
        rank.add(p['rank'])
    return [name, place, date, kind, unit, rank]

# -, -, -,
# 3. [이름][한문],
# 4. [serial],
# 5. [rank],
# 6. [birth],
# 7. [place],
# 8. [kind],
# 9. [unit],
# 10. [death]
# 11. [detail]


def xlsToDB(f):
    p = f.parse()
    v = p.values
    patrtc_list = []
    # list 생성
    for r in v:
        p = parse_r(r)
        if checkP(p):
            patrtc_list.append(p)
    # db 연결
    client = mongo.MongoClient('mongodb://localhost:27017/dev')
    db = client.rmbrme
    patrtc = db.patrtc
    # db에 값 추가
    for p in patrtc_list:
        if patrtc.find(p).count() == 0 and checkP(p):
            patrtc.insert_one(p)

    print(patrtc.find({'source': '군사편찬연구소'}).count())

# main


f = pd.ExcelFile('/root/toy/remember_me/data/korwar/mnd/1-10000.xls')
xlsToDB(f)
f = pd.ExcelFile('/root/toy/remember_me/data/korwar/mnd/10001-20000.xls')
xlsToDB(f)
f = pd.ExcelFile('/root/toy/remember_me/data/korwar/mnd/20001-30000(수정).xls')
xlsToDB(f)
f = pd.ExcelFile('/root/toy/remember_me/data/korwar/mnd/30001-40000.xls')
xlsToDB(f)
f = pd.ExcelFile('/root/toy/remember_me/data/korwar/mnd/40001-끝.xls')
xlsToDB(f)
