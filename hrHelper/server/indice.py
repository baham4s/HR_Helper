import datetime
import os
import sys
import time
import re
import json

def organise(file):
    dico = {}

    # Initialisation du dictionnaire pour contenir des tableau
    for personne in file:
        for key, value in personne.items():
            dico[key] = []

    # Remplissage du dico
    for personne in file:
        for key, value in personne.items():
            dico[key].append(value)

    return dico


# Parcours de personne --> Rajout parcours interne au personne
# Méthode de traitement des données
# Reformatter les dico pour stocker les valeur propre a chaque personne

# Assigner une valeur a chaque caractéristique
# --> Matrice ou liste de valeur

# Faire le graphe par rapport a cette matrice de valeur

# --------------------------------#
# - DEBUT TRAITEMENT DES DONNEES -#
# --------------------------------#

# Méthode qui renvoi un indice de date de mise en ligne
# -> (date_mise_en_ligne/date_actuel), les indices sont stocker dans un tableau
def dateMiseEnLigne(date): # mettre +1
    return 100


# Méthode qui renvoi un indice du niveau de formation d'un profil
# -> (niveau_étude_max/5)*100, les indices sont stocker dans un tableau
def niveauFormation(formation):
    lv_parse = []
    for i in formation:
        lv_parse.append([int(s) for s in re.findall(r'-?\d+\.?\d*', i['niveau'])])

    if not lv_parse or not max(lv_parse):
        return 0
    else:
        return int((max(max(lv_parse)) / 5) * 100)


# Méthode qui renvoi un indice sur le nombre de formation du profil
# -> sous forme d'intervalles : [0] = 0%, [1,3] = 25%, [4,6] = 50%, [7,9] = 75% , [10,+] = 100% | les indices sont stocker dans un tableau
def nombreExperience(exp):
    nbExp = len(exp)
    if nbExp == 0:
        return 0
    elif 1 <= nbExp <= 3:
        return 25
    elif 4 <= nbExp <= 6:
        return 50
    elif 7 <= nbExp <= 9:
        return 75
    else:
        return 100


# Méthode qui renvoi un indice sur le niveau en langues du profil
# -> (niveau_langue_total/nb_langue), les indices sont stocker dans un tableau
# Le niveau en langue est le suivant : 33% si débutant / 66% si intermediaire / 100% si courant
def niveauLangues(langue):
    niveau = 0
    for i in range(len(langue)):
        if "Courant" in langue[i]:
            niveau = niveau + 100
        elif "Interm" in langue[i]:
            niveau = niveau + 66
        else:
            niveau = niveau + 33
    return int(niveau / len(langue))


# Méthode qui renvoi un indice de disponibilité du profil
# -> 100 s'il est disponible 0 sinon, les indices sont stocker dans un tableau
def disponibilite(dispo):
    if "imm" in dispo:
        return 100
    else:
        return 0


def calculIndiceProfil(file):
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname("indice.py"))))
    dico = organise(file)
    A = []
    # Parcours du dico et application des méthodes de création d'indice sur chaque key
    # print("Nombre de profils : ", len(dico))
    for i in range(len(file)):
        z = [dateMiseEnLigne(dico.get("DateMiseEnLigne")[i]), niveauFormation(dico.get("formation")[i]),
             nombreExperience(dico.get("experience")[i]), disponibilite(dico.get("dispo")[i]),
             niveauLangues(dico.get("langues")[i])]
        A.append(z)
    return A


f = open("bdd.json", "r")
f_read = json.load(f)

matriceIndice = calculIndiceProfil(f_read)
print(matriceIndice)

