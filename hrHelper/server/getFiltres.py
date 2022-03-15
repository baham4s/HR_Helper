# TO-DO :
#   - Mettre dans une chaîne de caratère tout les filtres séparers par un ":"

# REMARQUE :
#   - Revoir l'écriture dans la BDD des langues et études car c'est une grosse chaine de caratère
#   - Elever les espaces après les "," dans les mots clés
#   - Deux fois disponibilité ?

import pymongo
import sys
import os


def main():
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname("getFiltres.py"))))
    # Connection a MongoDB avec le lien fourni sur le cloud
    myclient = pymongo.MongoClient(
        "mongodb+srv://hrhelper:hrhelper@hrhelper.iavo1.mongodb.net/profilesDB?retryWrites=true&w=majority")
    # Selection de la database
    database = myclient["profilesDB"]
    # Selection de la collection
    collection = database["filtres"]

    # Récupération du premier élements dans la BDD sous forme de dict
    dictFilter = collection.find_one()

    # Initialisation du filtre
    filterr = ""

    # On supprime les éléments inutiles avant le traitements
    del dictFilter["_id"]
    del dictFilter["__v"]

    print("\nCONTENUE DANS LA BDD :\n", dictFilter, "\n")

    # Prévisions des valeurs dans le filtre pour facilité le traitement
    langueCode = ["Anglais", "Allemand", "Espagnol", "Français"]
    etudeLevel = ["bac +1", "bac +2", "bac +3", "bac +4", "bac +5", "bac +6"]
    sep = " "
    sep_ou = ","

    # Parcours du dictionnaire et création du filtre
    for key, value in dictFilter.items():
        if key == "Permis" and value is True:
            filterr += "B-:"

        elif key == "dispoImmedia" and value is True:  # TRAITEMENT DE LA DISPONILITE
            filterr += "immédiate:"
        elif key == "dispoPlusTard" and value is True:  # TRAITEMENT DISPO PLUS TARD ???
            filterr += "Sous délai:"

        elif key == "selectedLangue":  # TRAITEMENT DES LANGUES
            for i in range(len(langueCode)):
                if value.find(langueCode[i]) >= 1:
                    filterr += langueCode[i] + (sep_ou if i != len(langueCode) - 1 else "")
            filterr += ":"

        elif key == "selectedEtude":  # TRAITEMENT DES ETUDES
            for i in range(len(etudeLevel)):
                if value.find(etudeLevel[i]) >= 1:
                    filterr += etudeLevel[i].replace("bac +", "Bac") + (sep if i != len(etudeLevel) - 1 else "")
            filterr += ":"

        elif key == "motCle":  # TRAITEMENT DES MOTS CLES
            filterr += value.replace(",", "") + ":"

        # else:  # ERROR
        #     print("Erreur : Key Name Unknown ---> ", key)
    return filterr

#
z = main()
print("\nLE FILTRE : ", z, "\n")

#%%
