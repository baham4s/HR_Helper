

const mongoose = require('mongoose');

// schema du modele pour push sur la BDD dans les filtres
const userSchema = mongoose.Schema({
  // ici qu il faut changer pour mettre sur la BDD
  Permis: { type: Boolean },
  dispoImmedia: { type: Boolean },
  dispoPlusTard: { type: Boolean },
  selectedLangue: { type: String },
  selectedEtude: { type: String },
  motCle: { type: String },
  anneExp: { type: String },


});
//, unique: true
//, required: true
// on push dans la table filtre
module.exports = mongoose.model('Filtre', userSchema);

