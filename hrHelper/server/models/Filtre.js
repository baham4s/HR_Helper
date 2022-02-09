

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // ici qu il faut changer pour mettre sur la BDD
  Permis: { type: Boolean },
  dispoImmedia: { type: Boolean },
  dispoPlusTard: { type: Boolean },
  selectedLangue: { type: String },
  selectedEtude: { type: String },
  motCle: { type: String },

});
//, unique: true
//, required: true
module.exports = mongoose.model('Filtre', userSchema);

