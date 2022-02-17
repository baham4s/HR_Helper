from sys import _debugmallocstats
import gspread
import json
import requests
from pprint import pprint
import pandas as pd
from df2gspread import df2gspread as d2g

from oauth2client.service_account import ServiceAccountCredentials
credentials={
  "type": "service_account",
  "project_id": "hrhelper-333014",
  "private_key_id": "f8745dcc7fcce660353e8c7a3384bc6107359f37",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwH4eq1HjcV7vO\nM0Acy9Swk5pqNe5aWZ/UlN51SdTp2LayZsSNTMaDLYl1bMCIbIDcB5zTs94CbUlk\nR0mPg/vkJtQ01Y/YsAffnf5q3R8rvisFa7uaDAaERunhGxlTJ3uKe5peIrtEOjDY\n/HW4eZ0kBO9u2pSlvz5cPzw9bQwCcJL7er6TElB/ewg+kC2pdzwhjwtAl9tH45eF\nrt0EVqa2vUr8bGhXBqA53AF7UEp4StYD8FMpSTbqjdb6plgpePMsH7Hfb6aEYmmC\n6LwbsyO76I6W9rB9vkguN3ZlgUfUssoJAbtB4Fh6BscLacaqSXsNAqBprFL72f8b\n+xW1U9thAgMBAAECggEAVPjxWI8oPI6rkoGRhhMla4fbMTER7U9eWI72gTn82lHv\nW0VPwShwgit/LUMp5OgMh5u4oz8ddqhJh3MJX497AQlmypLa0t2i/tVYQTCr8EvQ\nr83ZdiolHr6j6jJL1p2u8hJOWOqC1RkKJjYvibBLC2zCJAabPxh0usbbhntNFwNy\nQcooMrpOGm87NPkKr5lcZbkuAk0SQECP0jSUWeIb4BJRDNrQGkA9+kRWCRTRKJho\nE26jgpjl/qZX1MSdAy4GhY/+AKJTlFbtBlXVCh4lleRJj7CiDKtxb7fKg6rNDMk5\nKbZNMuBPcU/ifuz66N8vLFRnRfd0GI97wGeH7HL8vQKBgQDZsgTdLVWyu9pDMV4E\nNVQGYg88/igYzgaQ6dIHVxWYoAvHebuXkaVK1N7BIAUi4tOUUBCs0AiyqZbyIF92\nQObUS1dJtZXnW7GI1v0l+bKzC4MAIAdID9PpxEK9flKJsjY7B7vrIMVkDV9OzpY8\n50aSI1msk9tX40bCfQOwBjtsAwKBgQDPHOkmIwKiodjdToQC3G1GnLZivEdSYPft\n9x0n8tjXFIvbO8y7c+Md8jyJ2jKczNcznb+c4c10M8ff0NdKpSjtMZz1ANsY2oIN\nnuLfJ5YzoC4/EDsWSfi7H9saeBK7QXghWyGAWqRrwqKhLK2h01EWmLcyf5NiCJJs\ntNUdSUBnywKBgBDoVJxhAwDouiDx2p11DtuYDhrsmmyiw7vJjThouRKri36oo7s3\n4qCXO93AAOYeu9QPC9yAI8zMgx63CPMEQ2lFmLfu1H+tjXJVUD/8zrY9NKVz11zv\nbcQALDbPctWi87dN+HhgiTQmHbrfLKf6Rm7fM/3FVgnTaxF76CdptH/FAoGAdQvE\noz3T5m8K7P7LUgaaZvZ3iFMZB3AvjTdDLelrLBm7dBlWeXVjm+/i0JEUW1LUJ6J1\nwEZH4uzEfzM6CEBQYcPRDRD/wQrzxpjNZAmuM9zJZfBZRB5nx/CX1VyYUWUNa+Rh\niXUwSIoFeIqUUcjnoZqKpao9c4Cep3qGmfdkw4MCgYB5J0IY5bRpdbew+2HZRmSU\n08d4NHh0F50udExAIWCa+ui6OXEOQ++VkxB4ypOaZ9KnhqP4aR6MdzAUA4yaXcPI\nS7JR5xnZ0xucOeas00uzBRKrrWBeWDZ8roBUEGxTij/JUQXinwSSFg3GMjoQGOSy\nDj0DW0Hid05cYu78QwOQSw==\n-----END PRIVATE KEY-----\n",
  "client_email": "google-sheets@hrhelper-333014.iam.gserviceaccount.com",
  "client_id": "101129646538964863766",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-sheets%40hrhelper-333014.iam.gserviceaccount.com"
}
gc=gspread.service_account_from_dict(credentials)
sh=gc.open("Gspread")
worksheet = sh.sheet1

json_data=open(r"../scraping.json").read()
data=json.loads(json_data)

worksheet.update_cell(1, 1, "nom")
worksheet.update_cell(1, 2, "prenom")

worksheet.update_cell(1, 3, "debut")
worksheet.update_cell(1, 4, "fin")
worksheet.update_cell(1, 5, "description")
worksheet.update_cell(1, 6, "nom")
worksheet.update_cell(1, 7, "nom école")

worksheet.update_cell(1, 8, "debut")
worksheet.update_cell(1, 9, "fin")
worksheet.update_cell(1, 10, "nomDeLaCompagnie")
worksheet.update_cell(1, 11, "titre")
worksheet.update_cell(1,12, "location")
worksheet.update_cell(1, 13, "description")

def formation(data,worksheet):
  ligne=2
  ligne_bis=2
  i = 0
  lst = []
  for personne in data:
    for block in personne:
      if "firstName" in block:
       lst.append((block["firstName"], block["lastName"]))

  for personne in data:
    for block in personne:
      if "firstName" in block:
       noms=block["firstName"]
       prenom=block["lastName"]
      if "degreeName" in block:
        #print(block)
        debut=block["dateRange"]["start"]["year"]
        fin =block["dateRange"]["end"]["year"]
        description =block["description"]
        nom=block["degreeName"]
        if "schoolName" in block:
          nom_ecole=block["schoolName"]
        else:
          nom_ecole=" "
        print(debut)
        print(fin)
        print(description)
        print(nom)
        print(nom_ecole)
        worksheet.update_cell(ligne, 3, debut)
        worksheet.update_cell(ligne, 4, fin)
        worksheet.update_cell(ligne, 5, description)
        worksheet.update_cell(ligne, 6, nom)
        worksheet.update_cell(ligne, 7, nom_ecole)
        worksheet.update_cell(ligne, 1, lst[i][0])
        worksheet.update_cell(ligne, 2, lst[i][1])
        ligne=ligne+1
      if "locationName" in block:
        if "companyName" in block:
          #print(block)
          debut=block["dateRange"]["start"]["year"]
          if "end" in block["dateRange"]:
            fin =block["dateRange"]["end"]["year"]
          else:
            fin="x"
          nomDeLaCompagnie=block["companyName"]
          titre=block["title"]
          location=block["locationName"]
          if "description" in block:
            description=block["description"]
          else:
            fin=" "
          print(debut)
          print(fin)
          print(nomDeLaCompagnie)
          print(titre)
          print(location)
          worksheet.update_cell(ligne_bis, 8, debut)
          worksheet.update_cell(ligne_bis, 9, fin)
          worksheet.update_cell(ligne_bis, 10, nomDeLaCompagnie)
          worksheet.update_cell(ligne_bis, 11, titre)
          worksheet.update_cell(ligne_bis,12, location)
          worksheet.update_cell(ligne_bis, 13, description)
          ligne_bis=ligne_bis+1

    i+=1

formation(data,worksheet)


#d2g.upload(pf,"101129646538964863766","Données",credentials)

#pour recuperer une valeur
#print(sh.sheet1.get('A1'))

# pour recuperer toutes les valeurs
#list_of_lists = worksheet.get_all_values()
#print(list_of_lists)

#pour écrire dans une cellule
#worksheet.update_cell(4, 4, 'Robert')

#pour effacer
#worksheet.batch_clear(["A1:B1"])
