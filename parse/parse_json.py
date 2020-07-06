import pandas as pd
import pymongo as mongo

f=pd.read_csv('../data/patrtc/DS_WARHSTR_KORWAR_PATRTC.csv', encoding='cp949')
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


c=f.columns
v=f.values

patrtc_list=[]

def naive_dic():
    d={}
    d.setdefault('name_kor', '')
    d.setdefault('name_chi', '')
    d.setdefault('birth_year', -1)
    d.setdefault('birth_month', -1)
    d.setdefault('birth_day', -1)
    d.setdefault('die_year', -1)
    d.setdefault('die_month', -1)
    d.setdefault('die_day', -1)
    d.setdefault('place', '')
    d.setdefault('kind', '')
    d.setdefault('rank', '')
    d.setdefault('detail', '')
    d.setdefault('source', '')
    return d
    

def parse_r(r):
    d=naive_dic()
    for idx, data in enumerate(r):
        if idx<3:
            continue
        elif idx==3: # 'name_kor, rank'
            data=data.split(' ')
            d['name_kor']=data[0]
            d['rank']=data[1]
        elif idx==4: # detail
            d['detail']=data
        elif idx==5: # source
            d['source']=data
        elif idx==6: # 'name_chi'
            d['name_chi']=data
        elif idx==7: # 'birth-die'
            try:
                [birth, die]=data.split('-')
                [d['birth_year'], d['birth_month'], d['birth_day']]=[int(i) for i in birth.split('.')]
                [d['die_year'], d['die_month'], d['die_day']]=[int(i) for i in die.split('.')]
            except:
                print(data)
        elif idx==8:
            d['place']=data
        elif idx==9:
            data=data.split(' ')
            if d['rank']!=data[0]:
                d['kind']=data[0]
    return d

for r in v:
    patrtc_list.append(parse_r(r))
    
client = mongo.MongoClient('mongodb://127.0.0.1:27017/dev')
print(client.address)
print(client.HOST)
#print(client.)
print(client.database_names())
db=client.rmbrme
patrtc=db.patrtc
print(db.collection_names())
#print(patrtc.)

#result=patrtc.insert_many(patrtc_list)  
#print(result)

for p in patrtc_list:
    if patrtc.find(p).count()==0:
        patrtc.insert_one(p)
print(patrtc.find().count())