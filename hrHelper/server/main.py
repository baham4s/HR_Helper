import json
import re
import scrapping
import indice
import getFiltres
import pymongo
import copy


# corrigé bug de plusieurs filtre --> cree liste de 0 cmp nb * apparu et taille inpu
ret = []


# Recherche d'un mots exact dans une chaine
def find_word(text, search):
    result = re.findall('\\b' + search + '\\b', text, flags=re.IGNORECASE)
    return True if len(result) > 0 else False


# Envoie des donnée filtrer sur la BDD
def send_mongo(data):
    serv = pymongo.MongoClient(
        "mongodb+srv://hrhelper:hrhelper@hrhelper.iavo1.mongodb.net/profilesDB?retryWrites=true&w=majority")

    # Suppression des valeurs dans la table retour_filtres en supprimant la table
    serv['profilesDB'].drop_collection('retour_filtres')
    # Recréation de la table filtre
    serv['profilesDB'].create_collection('retour_filtres')
    # Ajout des données a la BDD
    serv['profilesDB']['retour_filtres'].insert_many(data)


# Lancement du scrapping
# scrapping.main("Java")

# Ouverture BDD
f = open("bdd.json", "r",encoding='utf-8')
f_read = json.load(f)

# Récupération de filtre via une requete
input_word = getFiltres.main().replace(':', ' ')

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
    input_word = list(filter(None, input_word.split(' ')))
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
matriceIndice = indice.calculIndiceProfil(copy.deepcopy(ret))
for i in range(len(ret)):
    ret[i]["Indice"] = matriceIndice[i]
print(ret)
print(len(ret))
send_mongo(ret)





# arrive sur le site retour_filtres est vide
# lancement recherche
#affiche bdd vide
# act
