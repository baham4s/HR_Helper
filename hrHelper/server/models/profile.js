const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    nom : {type : String, require : true},
    prenom : {type : String, require : true},
    statut : {type : String, require : true}
})

module.exports = mongoose.model('profile', profileSchema);