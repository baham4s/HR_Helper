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


// met a jour le filtre avec l 'id
router.put('', (req, res, next) => {
  console.log(req.body)
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require("child_process").spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  //    and arguments for the script

  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
  // so, first name = Mike and last name = Will
  var process = spawn('python',["../../latotal.py"] );

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {
    res.send(data.toString());
  } )

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
