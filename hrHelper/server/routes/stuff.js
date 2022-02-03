const express = require('express');
const filtre = require('../models/Filtre.js')
const Profile = require("../models/profile");

const router = express.Router();

router.use(express.json());
router.post('/', (req, res) => {
  console.log(req.body);
delete req.body._id;
//console.log(req);
const thing = new filtre({
...req.body
});
thing.save()
 .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
 .catch(error => res.status(400).json({ error }));
});



// router.get('', (req, res, next) => {
//   filtre.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// });
//

// Recupération de toutes la BDD
router.get('', function(req, res) {
  filtre.find({}, function(err, foundFiltre) {
    res.json(foundFiltre);
  });
});







module.exports=router;
