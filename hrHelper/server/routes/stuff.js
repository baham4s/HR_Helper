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

// Recupération de toutes la BDD
router.get('', function(req, res) {
  filtre.find({}, function(err, foundFiltre) {
    res.json(foundFiltre);
  });
});


router.put('', (req, res, next) => {
  console.log(req.body)
  filtre.updateOne({ _id: req.body._id }, { ...req.body, _id: req.body._id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});






module.exports=router;
