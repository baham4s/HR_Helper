import pdftotext
import json
import os
import sys

#Conversion d'un fichier PDF en un fichier txt
def pdf2Txt(filePDF) : 
    #Chargement du PDF à partir duquel il faut extraire les infos
    with open(filePDF, "rb") as f:
        pdf = pdftotext.PDF(f)
    
    #Création fichier pour stocker les données le temps du traitement (écriture)
    fichierSave = open("dataPDF.txt", "x")

    #Lecture de toutes les pages du PDF
    for page in pdf:
        #print(page)
        fichierSave.write(page)

    #Fermeture du fichier de sauvegarde
    fichierSave.close()


#Conversion d'un fichier txt en un fichier Json
def txt2Json() :
    #Fichier à convertir en Json
    filename = 'dataPDF.txt'

    #Création du fichier Json
    fichierJson = open("PDF.json", "w")

    #Création dictionnaire dans lequel on trouvera les mots
    dictionnaire = []
    #Liste des mots à ne pas prendre en compte dans le dictionnaire
    motsSansImportance =    ['de', 'des', 'le', 'la', 'les', 'a', 'un', 'une', 'à', 'Le', 'La', 'Les', 'De', 'Des', 'A', 'Une', 'Un', 'et', 'Et', 'dans', 'Dans',
                            'avec', 'Avec', 'en', 'En', 'au', 'Au', 'aux', 'Aux', 'par', 'Par', 'Pour', 'pour', 'du', 'Du', 'je', 'tu', 'il', 'elle', 'nous',
                            'vous', 'ils', 'elles']
    
    #Implémentation du dictionnaire
    with open(filename) as fichier:
        #Lit chaque ligne du fichier txt
        for line in fichier:
            text = line.split('\n') #Découpe le fichier en lignes
            ligne = str(text)
            #print("Ligne :", ligne)
            mots = ligne.split(' ') #Découpe chaque ligne en mots
            #print("Liste mot :", mots)
            cpt=0 #permet de savoir le numéro du mot de la ligne
            for i in mots : #Pour chaque mot
                if((i not in motsSansImportance) & (i!='') & (i!='\'\']') & (i!='[\"') & (i!= '/\',') & (i!='[\'')): 
                    #print("Test mot = ", i, "alnum ?", i.isalnum())
                    if(cpt==0):
                        i = i[2:] #suppression de [' pour le premier mot de la phrase
                        if(len(mots)==2):
                            i = i[:-2] #suppression de ', pour la fin du premier et unique mot de la ligne
                        if(i.isalnum()):
                            dictionnaire.append(i)
                    elif(cpt<len(mots)):
                        #print("Mot i = ", i)
                        if(i.isalnum()):
                            dictionnaire.append(i)
                        else :
                            x = 1
                            ok = 0
                            while((x<=3) & (ok == 0)):
                                new = i[:-x] #suppression des ponctuations de fin pour le dernier mot de la ligne
                                #print("New i : ", new)
                                if(new.isalnum()):
                                    dictionnaire.append(new)
                                    ok = 1
                                x+=1
                    cpt+=1
    print("Dictionnaire : ", dictionnaire)

    #Ajout du dictionnaire au fichier Json
    json.dump(dictionnaire, fichierJson, indent = 4, sort_keys = False)
    fichierJson.close()

#Test si le nom du fichier à convertir est bien passé en paramètre
if(len(sys.argv) == 1):
    print("ERREUR : \tusage : python3 scrapPDF.py nomFichierAconvertir")
else :
    fichier = sys.argv[1]
    print(fichier)
    pdf2Txt(fichier)
    txt2Json()

    #Suppression automatique du fichier txt
    try:
        os.remove('dataPDF.txt')
    except OSError as e:
        print(e)
    else:
        print("File is deleted successfully : data.PDF.txt")




