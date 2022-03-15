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

print("\nNombre de profil dans la DBB : ", len(f_read), "\n")

def indicateurLangue(profil, filtre, langueFiltreSort, motCleFiltreSort):

    #print("------------------ Profil ------------------ \n")

    indicateur = 0

    langue = profil.get("langues") # Les langues

    motCle = filtre.get("motCle")  # Les mots clé du filtre

    if(len(langueFiltreSort) == 0):   # AUCUN FILTRE

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

    elif(len(langueFiltreSort) >= 1 and not(motCle in stringMetierLangue)):  # FILTRE
        for j in range(len(langue)):
            #print("Contenu dans variable \"langue[j]\" : ", langue[j])
            #print("Contenu dans variable \"langueFiltreString\" : ", type(langueFiltreSort), langueFiltreSort, "\n")
            if(langue[j]=="null"):
                indicateur = 0
            else:
                for k in range(len(langueFiltreSort)):
                    if(langueFiltreSort[k] in langue[j]):
                        if("Courant" in langue[j]):
                            indicateur += 99
                        elif("Intermédiaire" in langue[j]):
                            indicateur += 66
                        elif("Débutant" in langue[j]):
                            indicateur += 33

                # print(indicateur, "/", len(langueFiltreSort))
                indicateur /= len(langueFiltreSort)

    elif(len(langueFiltreSort) >= 1 and (motCle in stringMetierLangue)):       # FILTRE + MOT CLE
                
        for j in range(len(langue)):
            #print("Contenu dans variable \"langue[j]\" : ", langue[j])
            #print("Contenu dans variable \"langueFiltreString\" : ", type(langueFiltreSort), langueFiltreSort, "\n")
            if(langue[j]=="null"):
                indicateur = 0
            else:
                for k in range(len(langueFiltreSort)):
                    if(langueFiltreSort[k] in langue[j]):
                        if("Courant" in langue[j]):
                            indicateur += 99
                        elif("Intermédiaire" in langue[j]):
                            indicateur += 50
                        elif("Débutant" in langue[j]):
                            indicateur += 25

                # print(indicateur, "/", len(langueFiltreSort))
                indicateur /= len(langueFiltreSort)

    return indicateur


tabLangue = ["Espagnol", "Allemand", "Français", "Anglais"]

stringMetierLangue = "Traducteur Interprète Tourisme Journalisme Informatique"

metierLangue = ["Traducteur", "Interprète", "Tourisme", "Journalisme", "Informatique"]

# LANGUE DANS LE FILTRE
langueFiltreSort = ""

if(dictFilter.get("selectedLangue") != ""):
    langueFiltre = dictFilter.get("selectedLangue")
    langueFiltre = langueFiltre.replace("\"", " ")  
    for i in range(len(tabLangue)):
        if tabLangue[i] in langueFiltre:
            langueFiltreSort += " " + tabLangue[i]

    langueFiltreSort = langueFiltreSort.split()

# MOT CLE DANS LE FILTRE
    motCleFiltreSort = ""

if(dictFilter.get("motCle") != ""):
    motCleFiltre = dictFilter.get("motCle")
    motCleFiltre = motCleFiltre.replace("\"", " ")
    for i in range(len(metierLangue)):
        if metierLangue[i] in motCleFiltre:
            motCleFiltreSort += " " + metierLangue[i]

    motCleFiltreSort = motCleFiltreSort.split() 

print("Langue(s) dans le filtre : ", langueFiltreSort, "\n")
print("Mots cle dans le filtre  : ", motCleFiltreSort, "\n")
print("------------------------------------------------------------------------------------\n")

indLangue = []
for k in range(len(f_read)):
    profil = f_read[k]
    indLangue.append(indicateurLangue(profil, dictFilter, langueFiltreSort, motCleFiltreSort))

print("Taille du tableau d'indice de langue : ", len(indLangue), "\n")

print("Langue : ", indLangue,"\n")