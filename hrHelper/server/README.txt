Faire fonctionner le Back-End avec Angular :
	- se rendre dans le dossier "server" et lancer index.js avec : $node index.js (aucun message d'erreur de doit apparaitre)
	- lancer Angular avec : $ng serve --open

Si tous se passe bien, dans la console, les données venant de MongoDB doivent apparaitre.

Angular est lancer sur http://localhost:4200/ et le données viennent de http://localhost:3001/api/v1/profile. On remarque que 
les deux dommaines sont différents donc CORS bloque les requetes. Pour regler le problème avec CORS, il a fallut faire un proxy 
pour tromper le navigateur et lui faire croire que les rêquetes sont de la même origine, du même domaine.