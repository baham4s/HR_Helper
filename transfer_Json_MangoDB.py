from pymongo import MongoClient
import json



cluster="mongodb+srv://HrHelper:1234@cluster0.iavo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client=MongoClient(cluster)

print(client.list_database_names())
db = client.test

print(db.list_collection_names())
json_data=open(r"scraping.json").read()





