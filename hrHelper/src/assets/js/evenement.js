num_event = 1;

/* Systeme de changement d'évenement en fonction d'un sens qui est défini par le bouton "suivant" (sens = 1) ou "précédent" (sens = -1) */
function changerEvent(sens, evenement1, evenement2, evenement3){

    /* Si le sens est égale à 1 (vers l'avant), alors on incrémente le numéro d'evenement */
    if(sens == 1){ 
        if(num_event == 1){ 
            num_event = 2;
        }else if(num_event == 2){
            num_event ++;
        }else if(num_event == 3){
            num_event = 1;
        }
    /* Si le sens est égal à -1 (vers l'arrières), alors on décrémente le numéro d'evenement */
    }else if(sens == -1){ //
        if(num_event == 1){
           num_event = 3;
        }else if(num_event == 2){
            num_event --;
        }else if(num_event == 3){
            num_event = 2;
        }
    }
    
    /* Affichage de l'évènement 1 */
    if(num_event == 1){
        document.getElementById('titre').innerHTML = evenement1[0];
        document.getElementById('date').innerHTML = evenement1[1];
        document.getElementById('adresse').innerHTML = evenement1[2];
        document.getElementById('photo').src = evenement1[3];
        document.getElementById('description').innerHTML = evenement1[4];
        document.getElementById('liens').href = evenement1[5]; 

        document.getElementById('cmp').innerHTML = "1/3";
    
    /* Affichage de l'évènement 2 */
    }else if(num_event == 2){
        document.getElementById('titre').innerHTML = evenement2[0];
        document.getElementById('date').innerHTML = evenement2[1];
        document.getElementById('adresse').innerHTML = evenement2[2];
        document.getElementById('photo').src = evenement2[3];
        document.getElementById('description').innerHTML = evenement2[4];
        document.getElementById('liens').href = evenement2[5]; 
            
        document.getElementById('cmp').innerHTML = "2/3";
    
    /* Affichage de l'évènement 3 */
    }else if(num_event == 3){
        document.getElementById('titre').innerHTML = evenement3[0];
        document.getElementById('date').innerHTML = evenement3[1];
        document.getElementById('adresse').innerHTML = evenement3[2];
        document.getElementById('photo').src = evenement3[3];
        document.getElementById('description').innerHTML = evenement3[4];
        document.getElementById('liens').href = evenement3[5]; 
            
        document.getElementById('cmp').innerHTML =  "3/3";

    }
}

    

