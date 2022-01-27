from concurrent.futures import BrokenExecutor
import json
import time
import datetime
from tokenize import Double

dbug = False


# Méthode qui retourne un indice selon la caractéristique
# Envoie des valeurs avec data['CARAC'] dans les méthodes
# -----------
def indice_date_mise_en_ligne(personne):
    return


# Ouverture du fichier JSON et initialisation des principale variable
f = open("pole_emploi.json", "r")
data = json.load(f)
tab_key = []

# Récupération des clé
for personne in data:
    if dbug: print(personne)
    for key, value in personne.items():
        tab_key.append(key)
# Suppression des doublons de clé
tab_key = list(set(tab_key))
if dbug: print(tab_key)

dico = {}
# Création d'un tableau contenant les informations des personnes pour une clé donnée

# Initialisation du dictionnaire pour contenir des tableau
for personne in data:
    for key, value in personne.items():
        dico[key] = []

# Remplissage du dico
for personne in data:
    for key, value in personne.items():
        dico[key].append(value)

# Parcours de personne --> Rajout parcours interne au personne
# Méthode de traitement des données
# Reformatter les dico pour stocker les valeur propre a chaque personne

# Assigner une valeur a chaque caractéristique
# --> Matrice ou liste de valeur

# Faire le graphe par rapport a cette matrice de valeur

#--------------------------------# 
#- DEBUT TRAITEMENT DES DONNEES -#
#--------------------------------#

# Méthode qui renvoi un indice de date de mise en ligne
# -> (date_mise_en_ligne/date_actuel), les indices sont stocker dans un tableau
indiceDate = []
def dateMiseEnLigne(date):
    jour = date[22:24]  # Recupération du jours dans la chaine de caractère
    mois = date[25:27]  # Récupération du mois dans la chaine de caractère
    annee = date[28:32] # Récuperation de l'année dans la chaine de caractère

    d = datetime.date(int(annee), int(mois), int(jour)) #  Création de la date de publication du profil en format Datetime python

    # Création de la date du système
    today = datetime.date.today()   
    z = datetime.date(today.year, today.month, today.day)

    # Transformation des dates en float et on soustrait les deux premières valeurs pour ne pas prendre en compte l'année
    unixtimeProfil = float(str(time.mktime(d.timetuple()))[2:])
    unixtimeToday =  float(str(time.mktime(z.timetuple()))[2:])

    # Création de l'indice et ajout dans le tableau
    indiceDate.append( int((unixtimeProfil/unixtimeToday)*100) )

# Méthode qui renvoi un indice du niveau de formation d'un profil
# -> (niveau_étude_max/5)*100, les indices sont stocker dans un tableau
indiceFormation = []
def niveauFormation(formation):
    tabTemp = []
    for i in range(len(formation)):
        formationTemp = formation.pop()     # Parcours de la liste des formations
        niveauTemp = formationTemp["niveau"]    # Récupération des informations avec comme key "niveau"
        niveau = niveauTemp[5:6]    # On récupère uniquement le caratère du niveau du bac (exemple : Bac+5, on récupère uniquement le 5)
        tabTemp.append(niveau)      # Ajout de tout les niveaux de Bac dans un tableau 

    niveauMax = max(tabTemp)      # On récupère uniquement la valeur max

    if not niveauMax.isdigit():   # Vérification du format
        niveauMax = 0

    indiceFormation.append( int((int(niveauMax)/5)*100) ) # Calcul de l'indice et ajout dans le tableau

# Calcul du nombre moyen d'experience de chaque profil dans la BDD
# def moyExperienceBDD(dico):
#    somme = 0
#    for i in range(len(dico)):
#        nbExp = len(dico.get("experience")[i])
#        somme = somme + int(nbExp)
#    return ( int(somme/len(dico)))

# Méthode qui renvoi un indice sur le nombre de formation du profil
# -> sous forme d'intervalles : [0] = 0%, [1,3] = 25%, [4,6] = 50%, [7,9] = 75% , [10,+] = 100% | les indices sont stocker dans un tableau
indiceExperience = []
def nombreExperience(exp):
    nbExp = len(exp)
    if(nbExp == 0):
        indiceExperience.append(0)
    elif(nbExp >= 1 and nbExp <=3):
        indiceExperience.append(25)
    elif(nbExp >= 4 and nbExp <= 6):
        indiceExperience.append(50)
    elif(nbExp >= 7 and nbExp <= 9):
        indiceExperience.append(75)
    else:
        indiceExperience.append(100)

# Méthode qui renvoi un indice sur le niveau en langues du profil
# -> (niveau_langue_total/nb_langue), les indices sont stocker dans un tableau
# Le niveau en langue est le suivant : 33% si débutant / 66% si intermediaire / 100% si courant
indiceLangue = []
def niveauLangues(langue):
    niveau = 0
    for i in range(len(langue)):
        if "Courant" in langue[i]:
            niveau = niveau + 100
        elif "IntermÃ©diaire" in langue[i]:
            niveau = niveau + 66
        else :
            niveau = niveau + 33
    indiceLangue.append( (int)(niveau/len(langue)) )

# Méthode qui renvoi un indice de disponibilité du profil
# -> 100 s'il est disponible 0 sinon, les indices sont stocker dans un tableau
indiceDispo = []
def disponibilite(dispo):
    if "immÃ©diate" in dispo:
        indiceDispo.append(100)
    else:
        indiceDispo.append(0)

# Parcours du dico et application des méthodes de création d'indice sur chaque key
for i in range(len(dico)):
    dateMiseEnLigne(dico.get("DateMiseEnLigne")[i])
    niveauFormation(dico.get("formation")[i])
    nombreExperience(dico.get("experience")[i])
    disponibilite(dico.get("dispo")[i])
    niveauLangues(dico.get("langues")[i])

print("\nIndice Date :\t", indiceDate,"\n")
print("Indice Froma :\t", indiceFormation,"\n")
print("Indice Expe :\t", indiceExperience,"\n")
print("Indice Dispo :\t", indiceDispo,"\n")
print("Indice Langue :\t", indiceLangue,"\n")


#%%
