from pymongo import MongoClient
import json

#connection serveur
cluster="mongodb+srv://HrHelper:1234@cluster0.iavo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client=MongoClient(cluster)

print(client.list_database_names())
db = client.test

print(db.list_collection_names())


#lecture js
json_data=open(r"scraping.json").read()
data=json.loads(json_data)
#print(data)


CVs={"dateRange": {"start": {"year": 1995}, "end": {"year": 1999}}, "description": "null", "degreeName": "Master's degree in Management"}, {"dateRange": {"start": {"year": 2012}, "end": {"year": 2012}}, "description": "NULL", "degreeName": "Executive Education"} 

todo=db.Personne
result=todo.insert_one(CVs)





