const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    nom : {type : String, require : true},
    prenom : {type : String, require : true},
    statut : {type : String, require : true}
})

// on recupere l'ensemble des donner qui provienne de la table retour-filtre
module.exports = mongoose.model('retour_filtre', profileSchema);
