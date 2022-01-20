# HrHelper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Back-End

Faire fonctionner le Back-End avec Angular :
	- se rendre dans le dossier "server" et lancer index.js avec : $node index.js (aucun message d'erreur de doit apparaitre)
	- lancer Angular avec : $ng serve --open

Librairies à installer :
	- Express : $npm install express --save
	- Mongoose : $npm install mongoose --save

Si tous se passe bien, dans la console, les données venant de MongoDB doivent apparaitre.

Angular est lancer sur http://localhost:4200/ et le données viennent de http://localhost:3001/api/v1/profile. On remarque que 
les deux dommaines sont différents donc CORS bloque les requetes. Pour regler le problème avec CORS, il a fallut faire un proxy 
pour tromper le navigateur et lui faire croire que les rêquetes sont de la même origine, du même domaine.
