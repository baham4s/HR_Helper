from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.firefox.options import Options
import re
import json
import os
import sys

# FIX ERROR
# Message: The element reference of <div class="media-body"> is stale; either the element is no longer attached to the DOM, it is not in the current frame context, or the document has been refreshed
# selenium.common.exceptions.NoSuchElementException: Message: Unable to locate element: [id="afficherMasquerTousLesParcours"]


# Méthode récupérant les informations sur les expérience et les formations d'un groupe de personne
def create_dic_xp_form(tab_personne):
    ret = []

    # Suppression des liste vide dans ma liste de personne
    z = [x for x in tab_personne if x != []]

    for personne in z:
        # Chargement des informations basique dans le dicitonnaire
        dico = {}
        for i in range(len(personne)):
            for j in range(len(personne[i])):
                if 'Profil' in personne[i][j]:
                    dico['DateMiseEnLigne'] = personne[i][j]
                    dico['titre'] = personne[i][j + 1]
                if 'Disponibilité' in personne[i][j]:
                    dico['dispo'] = personne[i][j]

        # Cas ou la personne a renseigner des points forts
        lst_pts_forts = ["null"]
        if len(personne[0]) > 2:
            for i in range(2, len(personne[0])):
                if 'POINTS FORTS' in personne[0][i]:
                    lst_pts_forts = personne[0][i + 1:]
        dico['ptsForts'] = lst_pts_forts

        experience = []
        formation = []

        for i in range(1, len(personne)):
            dico_tmp = {}

            # Récupération des expériences d'une personne
            if 'Expérience' in personne[i]:
                dico_tmp['titre'] = personne[i][1]
                dico_tmp['duree'] = personne[i][2]
                experience.append(dico_tmp)

            # Récupération des expériences d'une personne
            elif 'Formation' in personne[i]:
                if '|' in personne[i][1]:
                    tmp = personne[i][1].split('|')
                    dico_tmp['titre'] = tmp[0]
                    dico_tmp['niveau'] = tmp[1]
                else:
                    dico_tmp['titre'] = personne[i][1]
                    dico_tmp['niveau'] = "null"

                # Cas ou la personne a mis la plaquette de sa formation
                if 'Cette Formation contient une pièce jointe' not in personne[i][2]:
                    dico_tmp['duree'] = personne[i][2]
                else:
                    dico_tmp['duree'] = personne[i][3]
                formation.append(dico_tmp)

        # Ajout des expérinece au tableau d'une personne
        dico['experience'] = experience
        dico['formation'] = formation
        ret.append(dico)
    return ret


# Méthode récupérant les informations sur les compétence et les informations diverse d'un groupe de candidat
def create_dic_comp(tab_personne):
    ret = []
    for personne in tab_personne:
        index_nb_competence = 0
        index_nb_savoir_etre = 0
        index_nb_langues = 0
        index_nb_permis = 0
        dico = {}

        # Récupère les index de début des informations que l'on souhaite scrapper
        for i in range(len(personne)):
            if 'Savoirs et savoir-faire' in personne[i]:
                index_nb_competence = i
            if 'Savoir-être professionnels' in personne[i]:
                index_nb_savoir_etre = i
            if 'Langues' in personne[i]:
                index_nb_langues = i
            if 'Permis' in personne[i]:
                index_nb_permis = i

        # Vérifications que la partie existe
        if index_nb_competence != 0:
            # Nombre d'informations a scrapper
            nb_competence = list(map(int, re.findall('[0-9]+', personne[index_nb_competence])))[0]
            # Récupération des informations dans un tableau
            dico['competence'] = personne[index_nb_competence + 1:index_nb_competence + nb_competence + 1]
        else:
            # Retourne null si elle n'existe pas
            dico['competence'] = ["null"]

        if index_nb_savoir_etre != 0:
            # Nombre d'informations a scrapper
            nb_savoir_etre = list(map(int, re.findall('[0-9]+', personne[index_nb_savoir_etre])))[0]
            # Récupération des informations dans un tableau
            dico['savoirEtre'] = personne[index_nb_savoir_etre + 1:index_nb_savoir_etre + nb_savoir_etre + 1]
        else:
            # Retourne null si elle n'existe pas
            dico['savoirEtre'] = ["null"]

        if index_nb_langues != 0:
            # Nombre d'informations a scrapper
            nb_langues = list(map(int, re.findall('[0-9]+', personne[index_nb_langues])))[0]
            # Récupération des informations dans un tableau
            dico['langues'] = personne[index_nb_langues + 1:index_nb_langues + nb_langues + 1]
        else:
            # Retourne null si elle n'existe pas
            dico['langues'] = ["null"]

        if index_nb_permis != 0:
            # Nombre d'informations a scrapper
            nb_permis = list(map(int, re.findall('[0-9]+', personne[index_nb_permis])))[0]
            # Récupération des informations dans un tableau
            dico['permis'] = personne[index_nb_permis + 1:index_nb_permis + nb_permis + 1]
        else:
            # Retourne null si elle n'existe pas
            dico['permis'] = ["null"]

        ret.append(dico)
    return ret


def stop(driver, code):
    driver.quit()
    if code == 0:
        print("[+] Data !")
    elif code == 1:
        print("[-] Erreur")


def main(keyword):
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname("scrap_pole_emploi.py"))))
    # Options permettant de ne pas afficher le navigateur
    options = Options()
    options.add_argument('--headless')

    driver = webdriver.Firefox(options=options)
    # Chargement de la page d'accueil
    driver.get("https://entreprise.pole-emploi.fr/accueil/description/profil")

    print("[+] Page atteinte")
    # Input des mots clé de l'utilisateur
    driver.find_element_by_id('token-input-champsMultitagQuoi').send_keys(keyword)
    # Passage de l'étape d'acceptation des cookies
    driver.find_element_by_id('footer_tc_privacy_button_2').click()
    # Lancement de la recherche
    driver.find_element_by_id('lancerRechercheCv').click()
    if 'indisponible' in driver.title:
        print("serveur pas dispo")
        stop(driver, 1)
        return
    else:
        print("[+] Recherche lancer")

    # Récupération du nombre de profil possible a scrapper
    try:
        nb_profil = driver.find_element_by_xpath('//span[@class="subtitle"]').text.replace(" profils", "")
    except NoSuchElementException:
        stop(driver, 1)
        return

    # 5 correspond a 50 profil
    nb_clic = 3 if int(nb_profil) > 25 else int(int(nb_profil)/10)

    for i in range(nb_clic):
        driver.find_element_by_xpath(
            '/html/body/main/div[2]/form/div[3]/div[1]/div/div[2]/div/div[2]/div[51]/p/button').click()

    # Accès a l'interface avancé de vision des CV
    try:
        driver.find_element_by_xpath('//button[@class="lienclic-profil text-entreprise btn-reset"]').click()
    except NoSuchElementException:
        stop(driver, 1)
        return

    # Permet le chargement du CV
    driver.implicitly_wait(1)

    # NE PAS TOUCHER ( A QUOI SA SERT ??? )
    try:
        driver.find_element_by_xpath('//span[@class="text-entreprise"]').click()
    except NoSuchElementException:
        stop(driver, 1)
        return

    lst_tmp_xp_and_form = []
    lst_tmp_comp = []

    nb_profil = 25 if int(nb_profil) > 25 else int(nb_profil)

    # Boucle de parcours de tout les CV disponible a scrapper sur pôle emploi
    for i in range(nb_profil - 1):
        tmp_xp_and_form = []
        tmp_comp = 0

        # Accès a la totalité des Expérience et formation du candidat -> Clic sur Voir Plus
        if 'afficherMasquerTousLesParcours' in driver.page_source:
            driver.find_element_by_id('afficherMasquerTousLesParcours').click()

        # Permet le chargement du CV
        driver.implicitly_wait(3)

        # Problème a cause du rechargement de la page
        # Probable => Arrivé a 10 reload page car voir plus de profil
        # Récupération du code contenant les expériences et formations
        xp_and_form = driver.find_elements_by_xpath('//div[@class="media-body"]')

        # Récupération du code contenant les compétences
        comp = driver.find_elements_by_xpath('//div[@class="competences t-zone"]')

        # Formatage du code pour organiser les datas
        for j in xp_and_form:
            tmp_xp_and_form.append(j.text.split('\n'))

        for j in comp:
            tmp_comp = (j.text.replace('\n(', ' (').split('\n'))

        # Accès au profils suivant
        try:
            driver.find_element_by_xpath('//span[@class="icon-chevron-right"]').click()
        except NoSuchElementException:
            stop(driver, 1)
            return

        # Ajout d'une personne dans un groupe de personne
        lst_tmp_xp_and_form.append([x for x in tmp_xp_and_form[1:] if x != ['']])
        lst_tmp_comp.append(tmp_comp)
        print(f"[+] Profil n°{i} atteint")

    # Envoie du groupe de personne pour récupérer seulement les informations nécessaire dans un dictionnaire
    dico_xp_form = create_dic_xp_form(lst_tmp_xp_and_form)
    dico_comp = create_dic_comp(lst_tmp_comp)

    # Fusion des données pour que tous corresponde
    dico = []
    for i in range(len(dico_xp_form)):
        dico.append(dict(dico_xp_form[i], **dico_comp[i]))

    # Ecriture dans le fichier JSON
    with open('pole_emploi.json', 'w') as file:
        file.write(json.dumps(dico, indent=4, ensure_ascii=False))

    stop(driver, 0)
