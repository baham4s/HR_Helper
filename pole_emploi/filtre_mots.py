import json
import re

# Utilisation python3 filtre_word.py
# Saisir les mots clé avec "," en séparateur si on veut tout les profils contenant au moins 1 mots clé
# Saisir les mots clé avec " " en séparateur si on veut tout les profils contenant tout les mots clé

# Optimisation
# Rajouter suppression des caractère autre
# Ou
# Parser directement dans la recherche

valid = False
ret = []

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
                for v in value:
                    # Vérifie si tout les mots sont présent
                    valid = all([' ' + substring.upper() in str(value).upper() for substring in i])
                    if valid:
                        ret.append(personne)

# Suppression des doublons
ret = [i for n, i in enumerate(ret) if i not in ret[n + 1:]]
print(len(ret))
print(ret)
