

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // ici qu il faut changer pour mettre sur la BDD
  Permis: { type: Boolean, unique: true },


});
//, unique: true
//, required: true
module.exports = mongoose.model('Filtre', userSchema);

