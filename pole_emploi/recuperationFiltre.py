# TO-DO :
#   - Mettre dans une chaîne de caratère tout les filtres séparers par un ":"

# REMARQUE :
#   - Revoir l'écriture dans la BDD des langues et études car c'est une grosse chaine de caratère
#   - Elever les espaces après les "," dans les mots clés
#   - Deux fois disponibilité ?

import pymongo

# Connection a MongoDB avec le lien fourni sur le cloud
myclient = pymongo.MongoClient("mongodb+srv://hrhelper:hrhelper@hrhelper.iavo1.mongodb.net/profilesDB?retryWrites=true&w=majority")
# Selection de la database
database = myclient["profilesDB"]
# Selection de la collection
collection = database["filtres"]

# Récupération du premier élements dans la BDD sous forme de dict
dictFilter = collection.find_one()

# Initialisation du filtre
filter = ""

# On supprime les éléments inutiles avant le traitements
del dictFilter["_id"]
del dictFilter["__v"]

print("\nCONTENUE DANS LA BDD :\n", dictFilter, "\n")

# Prévisions des valeurs dans le filtre pour facilité le traitement
langueCode = ["ANG","ALL","ESP","FRA"]
etudeLevel = ["bac +1","bac +2","bac +3","bac +4", "bac +5", "bac +6"]

# Parcours du dictionnaire et création du filtre
for key, value in dictFilter.items():

  if(key == "Permis" and value == False):         # TRAITEMENT DU PERMIS
    filter = filter + "False:"
  elif(key == "Permis" and value == True):
    filter = filter + "True:"
  elif(key == "Permis" and value == ""):
    filter = filter + "null:"

  elif(key == "dispoImmedia"):                    # TRAITEMENT DE LA DISPONILITE
    filter = filter + value + ":"
  elif(key == "dispoImmedia" and value == ""):
    filter = filter + "null:"

  elif(key == "dispoPlusTard"):                   # TRAITEMENT DISPO PLUS TARD ???
    filter = filter + value + ":"
  elif(key == "dispoPlusTard" and value == ""):
    filter = filter + "null:"

  elif(key == "selectedLangue"):                  # TRAITEMENT DES LANGUES
    for i in range(len(langueCode)):
      if(value.find(langueCode[i]) >= 1):
        filter = filter + langueCode[i] + ","
    filter = filter + ":"
  elif(key == "selectedLangue" and value == ""):
    filter = filter + "null:"

  elif(key == "selectedEtude"):                   # TRAITEMENT DES ETUDES
    for i in range(len(etudeLevel)):
      if(value.find(etudeLevel[i]) >= 1):
        filter = filter + etudeLevel[i] + ","
    filter = filter + ":"
  elif(key == "selectedEtude" and value == ""):
    filter = filter + "null:"

  elif(key == "motCle"):                          # TRAITEMENT DES MOTS CLES
    filter = filter + value + ":"
  elif(key == "motCle" and value == ""):
    filter = filter + "null:"

  else :                                          # ERROR
    print("Erreur : Key Name Unknown")

print("\nLE FILTRE : ", filter,"\n")


