import gspread
import pandas as pd
import csv;

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
######################################
#scrapping
#worksheet.update_cell(4, 4, 'Robert')


#importation du fichier csv
#f= open (r"donnees.csv")
#myReader = csv.reader(f)
#lire=pd.read_csv(r"donnees.csv")
#print(lire)
#for row in myReader:
  #  worksheet.update_cell(2, 4, row)

###############################""

d=worksheet.get_all_values()
df = pd.DataFrame(d)
#data = df.iloc[0]
#worksheet.batch_clear(["A1:C1"])
#df.columns = [data]
print(df)




