# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 09:35:41 2020

@author: antemrdm
"""

import pandas as pd
import pymongo as mongo
import re

f=pd.ExcelFile('../data/korwar/mnd/1-10000.xls')
p=f.parse()

# -, -, -,
# 3. [이름][한문],
# 4. [serial],
# 5. [rank],
# 6. [birth],
# 7. [place],
# 8. [kind],
# 9. [unit],
# 10. [die]
# 11. [detail]

c=p.columns
v=p.values

patrtc_list=[]

def naive_dic():
    d={}
    d.setdefault('group', 'korwar')
    d.setdefault('name_kor', None)
    d.setdefault('name_chi', None)
    d.setdefault('birth_year', None)
    d.setdefault('birth_month', None)
    d.setdefault('birth_day', None)
    d.setdefault('die_year', None)
    d.setdefault('die_month', None)
    d.setdefault('die_day', None)
    d.setdefault('place', None)
    d.setdefault('serial', None)
    d.setdefault('kind', None)
    d.setdefault('unit', None)
    d.setdefault('rank', None)
    d.setdefault('detail', None)
    d.setdefault('source', '군사편찬연구소')
    return d    

def parse_r(r):
    d=naive_dic()
    for idx, data in enumerate(r):
        if idx<3:
            continue
        elif idx==3: # 'name_kor, name_chi'
            try:
                kor_row=re.compile('[(]+.*[)]+').sub('',data)
                kor_row=re.compile('\S+').findall(kor_row)
                kor=''
                for i in kor_row:
                    kor+=i
                chi_row=re.compile('[(].*[)]').findall(data)[0][1:-1]
                chi_row=re.compile('\S+').findall(chi_row)
                chi=''
                for i in chi_row:
                    chi+=i
                d['name_kor']=kor
                d['name_chi']=chi
            except:
#                print('name_chi error', idx, data)
                continue
        elif idx==5: # rank
            try:
                d['rank']=data.rstrip().lstrip()
            except:
                print(data)
        elif idx==6: # birth
            try:
                [d['birth_year'], d['birth_month'], d['birth_day']]=[int(i) for i in data.split('-')]
            except:
                print('birth error', idx, data)
        elif idx==7: # place
            try:
                d['place']=data.rstrip().lstrip()
            except:
                print(data)
        elif idx==8:
            try:
                d['kind']=data.rstrip().lstrip()
            except:
                print(data)
        elif idx==9:
            try:
                d['unit']=data.rstrip().lstrip()
            except:
                print(data)
        elif idx==10:
            try:
                [d['die_year'], d['die_month'], d['die_day']]=[int(i) for i in data.split('-')]
            except:
                print('die error', idx, data)
        elif idx==11:
            d['detail']=data.rstrip().lstrip()
    return d

for r in v:
    patrtc_list.append(parse_r(r))
    
client = mongo.MongoClient('mongodb://127.0.0.1:27017/dev')
print(client.address)
print(client.HOST)
print(client.database_names())
db=client.rmbrme
patrtc=db.patrtc
print(db.collection_names())

for p in patrtc_list:
    if patrtc.find(p).count()==0:
        patrtc.insert_one(p)
        
#print(patrtc.find({'source':'군사편찬연구소'}).count())
