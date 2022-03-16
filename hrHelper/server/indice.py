import datetime
import os
import sys
import time
import re
import json
import pymongo
from operator import itemgetter


# Parcours de personne --> Rajout parcours interne au personne
# Méthode de traitement des données
# Reformatter les dico pour stocker les valeur propre a chaque personne

# Assigner une valeur a chaque caractéristique
# --> Matrice ou liste de valeur

# Faire le graphe par rapport a cette matrice de valeur

# --------------------------------#
# - DEBUT TRAITEMENT DES DONNEES -#
# --------------------------------#

# INDICATEUR SUR LES LANGUES
def indicateurLangue(profil, filtre, langueFiltreSort, motCleFiltreSort):

    # print("\n----------------- PROFIL -----------------\n")

    indicateur = 0

    langue = profil.get("langues") # Les langues

    motCle = filtre.get("motCle")  # Les mots clé du filtre

    if(motCle == ""):
        motCle = "null"

    if(len(langueFiltreSort) == 0):   # AUCUN FILTRE
        # print("AUCUN FILTRE")
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
        # print("FILTRE")
        for j in range(len(langue)):
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

                indicateur /= len(langueFiltreSort)

    elif(len(langueFiltreSort) >= 1 and (motCle in stringMetierLangue)):       # FILTRE + MOT CLE
        # print("FILTRE + MOT CLE")
        for j in range(len(langue)):
            if(langue[j]=="null"):
                indicateur = 0
            else:
                for k in range(len(langueFiltreSort)):
                    if(langueFiltreSort[k] in langue[j]):
                        if("Courant" in langue[j]):
                            indicateur += 99
                        elif("Intermédiaire" in langue[j]):
                            indicateur += 40
                        elif("Débutant" in langue[j]):
                            indicateur += 10

                indicateur /= len(langueFiltreSort)
    
    else:                                                               # MOT CLE
        # print("MOT CLE")
        if(langue[0]=="null"):
            indicateur = 0
        else:
            for i in range(len(langue)):
                if("Courant" in langue[i]):
                    indicateur += 99
                elif("Intermédiaire" in langue[i]):
                    indicateur += 40
                else:
                    indicateur += 10
            indicateur /= len(langue)

    # print(indicateur)
    return int(indicateur)

# INDICATEUR SUR L'EXPERIENCE
# https://myrhline.com/type-article/recruteurs-pourquoi-vous-ne-devez-pas-demander-plus-de-3-ans-d-experience-aux-candidats/amp/
def indicateurExperience(profil, filtre, motCleFiltreSort):

    # print("\n----------------- PROFIL -----------------\n")

    exp = profil.get("experience")

    # expVoulu = filtre.get("experience")
    expVoulu = -1

    dureeExperienceTotal = 0
    
    if(len(exp)== 0):
        # print("Sans experiences")
        return 0

    else:                                           
        experience = []
        duree = " "
        detectTimeAns = "ans an"
        detectTimeMois = "mois"
        for i in range(len(exp)):
            # experience["n°"][0:Titre - 1:Duree]
            experience.append([exp[i].get("titre"), exp[i].get("duree")])

        for j in range(len(experience)):
            duree = experience[j][1]
            duree = duree.replace("(","").replace(")","")
            duree = duree.split()

            for k in range(len(duree)):
                if(duree[k] in detectTimeMois):
                    dureeExperienceTotal += (int(duree[k-1]))
                elif(duree[k] in detectTimeAns):
                    dureeExperienceTotal += (int(duree[k-1])*12)
            
        # print("Duree total :", dureeExperienceTotal)
        
        if(expVoulu == -1):                             # SANS FILTRES    
            if(dureeExperienceTotal < 12):
                indicateur = 25
            elif(dureeExperienceTotal >= 12 and dureeExperienceTotal < 36):
                indicateur = 50
            elif(dureeExperienceTotal >= 36 and dureeExperienceTotal < 72):
                indicateur = 75
            elif(dureeExperienceTotal >= 72):
                indicateur = 100
        else:                                                           # AVEC FILTRES 
            if( (dureeExperienceTotal / (expVoulu*12)) >= 1):
                indicateur = 100
            else:
                indicateur = (dureeExperienceTotal / (expVoulu*12)) * 100

    return int(indicateur)

# INDICATEUR SUR LES FORMATIONS
def indicateurFormation(profil, filtre):

    indicateur = -1
    
    etudeRequis = filtre.get("selectedEtude")

    formation = profil.get("formation")

    # On récupère tous les niveaux d'études après le bac
    if(len(formation) == 0):
        return 0
    else: 
        niveauBacMax = []
        niveauBacMaxDigit = []
        for i in range(len(formation)):
            niveauBac = formation[i].get("niveau").split()
            if(niveauBac[0] == 'null'):
                niveauBacMax.append("Bac0")
            else:
                if( (niveauBac[1] in "Bac0 Bac1 Bac2 Bac3 Bac4 Bac5") ):
                    niveauBacMax.append(niveauBac[1])
                elif(len(niveauBac[0]) >= 4 and niveauBac[0] != "CAP," ) :
                    niveauBacMax.append(niveauBac[0])
                else:
                    niveauBacMax.append("Bac1")

        for j in range(len(niveauBacMax)):
            if(niveauBacMax[j][3].isdigit()):
                niveauBacMaxDigit.append(int(niveauBacMax[j][3]))
            elif(niveauBacMax[j][0].isdigit()):
                niveauBacMaxDigit.append(int(niveauBacMax[j][0]))
        
        # Création des indicateurs de formations 
        if(etudeRequis == "[]"):                      # SANS FILTRE
            indicateur = int(( max(niveauBacMaxDigit) / 5 ) * 100)
        else:                                       # AVEC FILTRE
            etudeRequis = int(etudeRequis[15])
            indicateur = int(( max(niveauBacMaxDigit) / etudeRequis ) * 100)

        # On affine les indicateurs en fonction du plus haut diplome obtenu
        maxI = []
        for k in range(len(niveauBacMaxDigit)):
            if(niveauBacMaxDigit[k] == max(niveauBacMaxDigit)):
                maxI.append(k)
                
        stringEtudeSup = ["Docteur", "docteur", "Doctorat", "doctorat", "Master", "Ingénieur", "ingénieur", "ingénierie"]
        stringEtudeMoy = ["Licence", "licence", "DUT", "BTS", "Bac Pro", "BAC PRO", "Bac pro", "LICENCE"]
        nivEtude = 0
        for l in maxI:
            for m in range(len(stringEtudeSup)):
                if(stringEtudeSup[m] in formation[l].get("titre")):
                    if(nivEtude <= 1):
                        nivEtude = 1
                elif(stringEtudeMoy[m] in formation[l].get("titre")):
                    if(nivEtude <= 0.75):
                        nivEtude = 0.75
            if(nivEtude == 0):
                nivEtude = 0.50

    return int(indicateur * nivEtude)

# --------------------------------#
# - AJOUT DES INDICATEURS PROFIL -#
# --------------------------------#

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

#print("\nNombre de profil dans la DBB : ", len(f_read), "\n")

tabLangue = ["Espagnol", "Allemand", "Français", "Anglais"]

stringMetierLangue = "Traducteur-Interprète-Tourisme-Journalisme-Informatique"

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

print(dictFilter)

print("\nLangue(s) dans le filtre : ", langueFiltreSort, "\n")
print("Mots cle dans le filtre  : ", motCleFiltreSort, "\n")


def calculIndiceProfil(file):
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname("indice.py"))))
    A = []
    for k in range(len(file)):
        profil = file[k]
        z= [indicateurExperience(profil, dictFilter, motCleFiltreSort),
            indicateurFormation(profil, dictFilter),
            indicateurLangue(profil, dictFilter, langueFiltreSort, motCleFiltreSort)
            ]
        A.append(z)

    return A

matriceIndice = calculIndiceProfil(f_read)
print("\n\n", matriceIndice)
