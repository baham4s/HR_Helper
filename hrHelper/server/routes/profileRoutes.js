const express = require('express');
const Profile = require('../models/profile.js')

const router = express.Router();

// Recupération de toutes la BDD
router.get('', function(req, res) {
	Profile.find({}, function(err, foundProfile) {
        res.json(foundProfile);
	});
});


// Recherche par id
router.get('/:id', function(req, res) {
	const profileId = req.params.id;
	Profile.findById(profileId, function(err, foundProfile) {
		if(err){
			res.status(422).send({ errors : [{id:profileId,title: 'ID Profile Error!', detail: 'Profil introuvable' }]})
		}
        res.json(foundProfile);
	});
});



// exemple :
//  http://localhost:3001/api/v1/profile/61e426adb54bbeaed1eb37a7


module.exports = router;
