import pandas as pd
import pymongo as mongo

f = pd.read_csv('../data/korwar/DS_WARHSTR_KORWAR_PATRTC.csv',
                encoding='cp949')
# 1	전쟁/군사정보>6.25전쟁>호국선열(인물) 정보	PS01004076	백성흠 소위	상세설명 전쟁기념관	白聖欽	1926.2.10-1950.6.30	경북 청송	공군 소위	충무무공훈장
# -, -, -,
# 3. [이름][계급],
# 4. 상세,
# 5. [출처],
# 6. [한문이름],
# 7. [출생-사망],
# 8. [출생지역],
# 9. [군 계급],
# 10. [훈장]


c = f.columns
v = f.values

patrtc_list = []


def naive_dic():
    d = {}
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
    d.setdefault('source', '전쟁기념관')
    return d


def parse_r(r):
    d = naive_dic()
    for idx, data in enumerate(r):
        if idx < 3:
            continue
        elif idx == 3:  # 'name_kor, rank'
            data = data.split(' ')
            d['name_kor'] = data[0].rstrip().lstrip()
            d['rank'] = data[1].rstrip().lstrip()
        elif idx == 4:  # detail
            d['detail'] = data.rstrip().lstrip()
        elif idx == 6:  # 'name_chi'
            d['name_chi'] = data.rstrip().lstrip()
        elif idx == 7:  # 'birth-die'
            try:
                [birth, die] = data.split('-')
                [d['birth_year'], d['birth_month'], d['birth_day']] = [
                    int(i) for i in birth.split('.')]
                [d['die_year'], d['die_month'], d['die_day']] = [
                    int(i) for i in die.split('.')]
            except:
                a=1
                # print(data)
        elif idx == 8:
            try:
                d['place'] = data.rstrip().lstrip()

            except:
                a=1
                # print(data)
        elif idx == 9:
            data = data.split(' ')
            if d['rank'] != data[0].rstrip().lstrip():
                d['kind'] = data[0].rstrip().lstrip()
    return d


def checkP(d):
    if len(d['name_kor']) < 2:
        return False
    else:
        return True


for r in v:
    patrtc_list.append(parse_r(r))

client = mongo.MongoClient('mongodb://localhost:27017/dev')
print(client.address)
print(client.HOST)
print(client.database_names())
db = client.rmbrme
patrtc = db.patrtc
print(db.collection_names())

for p in patrtc_list:
    if patrtc.find(p).count() == 0 and checkP(p):
        # print(p['name_kor'])
        patrtc.insert_one(p)
        a=1
    else:
        # print('!!!!!!!!!!!!', p)
        a=2


print(patrtc.find({'source':'전쟁기념관'}).count())
