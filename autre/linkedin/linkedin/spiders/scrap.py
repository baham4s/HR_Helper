import scrapy
import json


class LinkedinSpider(scrapy.Spider):
    # Nom du scrapper (scrapy crawl linkedin)
    name = "linkedin"
    # URL de lancement de scrapping
    login_url = 'https://www.linkedin.com/'
    # URL a scrapper
    start_urls = [
        'https://www.linkedin.com/in/baptiste-dubin-55913b228/',
        'https://www.linkedin.com/in/fabienversavau/'
    ]

    a = False

    # Lancement du scrapper
    def start_requests(self):
        # Envoie les résultat de la requete a la méthode login
        yield scrapy.Request(url=self.login_url, callback=self.login)

    # Connection au service
    def login(self, response):
        # Envoie des informations nécessaire pour se logger et appel de méthode check_login_response
        return scrapy.FormRequest.from_response(
            response, formdata={'session_key': "baptiste.dubin@gmail.com",
                                'session_password': "spa$F34FdB3QP9&?"},
            callback=self.check_login_response)

    # Vérifications connection au site
    def check_login_response(self, response):
        # Erreur connection -> STOP
        if b'login-error' in response.body:
            self.logger.error("[-] Login failed :(")
            return
        # Connection réussi appel de la méthode de parse des pages
        else:
            self.logger.info("[+] Login successful :)")
            # Remise a zéro du fichier contenant les datas scrapper
            with open("linkedin.json", mode='w', encoding='utf-8') as file:
                pass
            # Mots clé de recherche de profils
            if self.a:
                print("Keywords : ")
                search = input()
                self.start_urls[0] += search
                self.logger(self.start_urls[0])
            # Scrapping des URL de tous les profils de la pages
            for u in self.start_urls:
                yield scrapy.Request(u, callback=self.parse_profil)

    # Scrapping des données d'un profil linkedin
    def parse_profil(self, response):
        reponse = response.css("code::text")
        # Position dans le code source d'ou se situe les datas
        data = json.loads(reponse[24].get())
        # Classe a scrapper
        feature = open("features.txt")
        feature_open = feature.read()
        liste = []

        # Fichier stockant les datas scrapper
        with open("linkedin.json", 'a') as file:
            for i in range(len(data["included"])):
                # Récupération des datas intéressante
                tmp = self.extract_data(data["included"][i], feature_open)
                if tmp is not None:
                    # Suppression des clé parasite et ajout dans la liste de retour
                    liste.append(self.delete_val(tmp))
            # Ajout dans le json des datas scrapper
            json.dump(liste, file)
        self.logger.info("[+] Data!!!")

    # Scrapping des données d'une page de recherche
    # Limite de recherche ....
    def parse_search(self, response):
        reponse = response.css("code::text")
        data = json.loads(reponse[14].get())
        self.logger.info("[+] Data!!!")
        yield data

    # Méthode parcourant un dictionnaire en entrée et recherchant certaine
    # clé pour retourner un dictionnaire ne contenant que c'est clé
    def extract_data(self, donne, cle):
        dicto = {}
        for key, value in donne.items():
            # Si la clé est présente et rechercher on la stock avec sa valeur
            if key in cle:
                dicto[key] = value
            # Parcours récursif si dictionnaire imbriqué
            if isinstance(value, type(dict())):
                self.extract_data(value, cle)
            elif isinstance(value, type(list())):
                for val in value:
                    # Si on arrive sur une "feuille" du dictionnaire
                    if isinstance(val, type(str())) or isinstance(val, type(list())):
                        if dicto != {}:
                            return dicto
                    # Appel récursif si encore un dict
                    else:
                        self.extract_data(val, cle)

    # Suppresion des clés parasites
    @staticmethod
    def delete_val(dicto):
        remove = ['$recipeTypes', '$type']
        for v in remove:
            if "dateRange" in dicto:
                del dicto["dateRange"][v]
                if "end" in dicto["dateRange"]:
                    del dicto["dateRange"]["end"][v]
                if "start" in dicto["dateRange"]:
                    del dicto["dateRange"]["start"][v]
        return dicto

