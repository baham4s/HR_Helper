import json
import re
from pole_emploi import scrap_pole_emploi, graphe

# Utilisation python3 filtre_word.py
# Saisir les mots clé avec "," en séparateur si on veut tout les profils contenant au moins 1 mots clé
# Saisir les mots clé avec " " en séparateur si on veut tout les profils contenant tout les mots clé

# Optimisation
# Rajouter suppression des caractère autre
# Ou
# Parser directement dans la recherche
# --------------
# V2 appel du scrapping dans ce fichier pour récupéré
# 25 profils mots clé --> JAVA
# Envoie sur mongo de cette bdd
# --------------
# filtrage si actualisation table filtre --> utilsiation API écoute maj
# => Voir API || Chercher solution pour savoir quand la table filtre est modifié
# push dans la bdd du json fils dans une autre table
# --------------
# || Intégration JS du filtrage
# || Modification envoie BDD string --> Modification du filtre.ts
# || Performance de l'appel a un script python ou JS???
# --------------
# Remplacer mots clé du scrap par liste de filtre ---> bad time
# Remplacer mots dans input filtre --> petite BDD proposé

valid = False
ret = []


# Recherche d'un mots exact dans une chaine
def find_word(text, search):
    result = re.findall('\\b' + search + '\\b', text, flags=re.IGNORECASE)
    return True if len(result) > 0 else False


# Lancement du scrapping
####################################
####################################
####################################
# DECOMMENTER POUR LANCER SCRAP AVEC
####################################
####################################
####################################
# scrap_pole_emploi.main("Java")

# Ouverture BDD
f = open("pole_emploi.json", "r")
f_read = json.load(f)

# Liste de mots clé
print("Saisir mots clé : ")
input_word = input()

# Ou
if ',' in input_word:
    # Séparation des mots saisi
    input_word = input_word.split(',')

    # Parcours BDD
    for personne in f_read:
        s = json.dumps(personne)
        d = json.loads(s)
        # Parcours mots clé
        for word in input_word:
            # Parcours dossier d'une personne
            for value in d.values():
                # Vérifie si un mots est présent
                if re.search(r"\b" + re.escape(word.upper()) + r"\b", str(value).upper()):
                    ret.append(personne)
# Et
else:
    # Séparation des mots saisi
    input_word = input_word.split(' ')
    # Parcours BDD
    for personne in f_read:
        s = json.dumps(personne)
        d = json.loads(s)

        # Parcours mots clé
        for i in input_word:
            # Parcours dossier d'une personne
            for value in d.values():
                # Parcours dispo, titre, date
                if isinstance(value, str):
                    if find_word(value.upper(), i.upper()):
                        ret.append(personne)
                # Parcours autre carac
                elif isinstance(value, list):
                    for v in value:
                        # Parcours mots clé
                        if isinstance(v, str):
                            if find_word(v.upper(), i.upper()):
                                ret.append(personne)
                        # Parcours expérience, formation
                        elif isinstance(v, dict):
                            for a in v.values():
                                if find_word(a.upper(), i.upper()):
                                    ret.append(personne)

# Suppression des doublons
ret = [i for n, i in enumerate(ret) if i not in ret[n + 1:]]

matriceIndice = graphe.calculIndiceProfil(ret)
for i in range(len(ret)):
    ret[i]["Indice"] = matriceIndice[i]
print(ret)

#%%
