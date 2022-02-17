const express = require('express');
const filtre = require('../models/Filtre.js')
const Profile = require("../models/profile");

const router = express.Router();

router.use(express.json());

// Envoie les filtre dan sla BDD en les ajoutant
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


const {PythonShell} = require('python-shell');

// met a jour le filtre avec l 'id avec l'execution du programme python
router.put('', (req, res, next) => {
  console.log(req.body)
// PythonShell.run('../../../../pole_emploi/./filtre_mots.py', null, function (err, results) {
  PythonShell.run('./main.py', null, function (err, results) {
    if (err) throw err;
    console.log('finished');
    console.log(results);
  });
  filtre.updateOne({ _id: req.body._id }, { ...req.body, _id: req.body._id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
});

// // met a jour le filtre avec l 'id
// router.put('', (req, res, next) => {
//   console.log(req.body)
//   filtre.updateOne({ _id: req.body._id }, { ...req.body, _id: req.body._id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });
module.exports=router;
