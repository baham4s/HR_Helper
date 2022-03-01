import json
import pymongo


# Ouverture BDD
f = open("bdd.json", "r", encoding='utf-8')
f_read = json.load(f)

# Connection a MongoDB avec le lien fourni sur le cloud
myclient = pymongo.MongoClient("mongodb+srv://hrhelper:hrhelper@hrhelper.iavo1.mongodb.net/profilesDB?retryWrites=true&w=majority")
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

print("\nFiltre dans la BDD :\n", dictFilter, "\n")

print("Nombre de profil dans la DBB : ", len(f_read), "\n")

metierLangue = ["Traducteur", "Interprète", "Tourisme", "Journalisme", "Informatique"]

def indicateurLangue(profil, filtre):
    indicateur = 0
    langue = profil.get("langues")
    cpt = 0

    if(filtre.get("selectedLangue") == "[]"):   # AUCUN FILTRE
        # print("\nQuand le filtre ne comporte aucune information sur une langue vivante")
        if(langue[0]=="null"):
            indicateur = 0
        else:
            for i in range(len(langue)):
                if("Courant" in langue[i]):
                    indicateur += 99
                elif("Intermédiaire" in langue[i]):
                    indicateur += 66
                else:
                    indicateur += 33
            indicateur /= len(langue)
    elif(filtre.get("selectedLangue") != "[]" and filtre.get("motCle") == ""):  # FILTRE
        # print("\nQuand le filtre comporte une ou des langues vivantes")
        level = filtre.get("selectedLangue")
        level = level.replace("[","")
        level = level.replace("]","")
        level = level.replace(","," ")
        print(level)
        for i in range(len(langue)):
            if(level in langue[i]):
                cpt += 1
                if("Courant" in langue[i]):
                    indicateur += 99
                elif("Intermédiaire" in langue[i]):
                    indicateur += 66
                elif("Débutant" in langue[i]):
                    indicateur += 33
        if(cpt != 0):
            indicateur /= cpt
    else:                                       # FILTRE + MOT CLE
        # print("\nQuand le filtre comporte une ou des langues vivantes et un mot clé supplémentaire comme un métier ou un domaine")
        motcle = filtre.get("motCle")

    return indicateur

indLangue = []
for i in range(len(f_read)):
    profil = f_read[i]
    indLangue.append(indicateurLangue(profil, dictFilter))

print(len(indLangue))
print(indLangue,"\n")