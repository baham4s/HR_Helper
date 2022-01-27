const express = require('express');
const filtre = require('../models/Filtre.js')

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

module.exports=router;
