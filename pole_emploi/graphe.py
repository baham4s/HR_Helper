import json

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

#%%
