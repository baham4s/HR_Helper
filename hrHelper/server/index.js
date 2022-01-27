// Server Side Application

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const Profile = require('./models/profile.js');
const profileRoutes = require('./routes/profileRoutes.js');
const cors = require('cors');
const app = express();
const User = require('./models/Filtre.js');

const stuffRoute=require('./routes/stuff.js');



// mongoimport --uri mongodb+srv://hrhelper:hrhelper@nodeapp.bhdfx.mongodb.net/PoleEmploiDB --collection PoleEmploi --type JSON --file pole_emploi.json

// Handle Cors Error
app.use(cors());

// Connect to MyFirstDatabase in NodeApp Cluster
mongoose.connect(config.DB_URI, { useNewUrlParser : true })

// Application listen to receive HTTP requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log("Running on", PORT, "-> SERVER ON !");
});

// Endpoint / Route
app.get('/users', function(req, res){
    res.json({"succes":true});
});





//app.post('/register', (req, res, next) => {
  //delete req.body._id;
  //console.log(req);
  //const thing = new Thing({
   // ...req.body
  //});
  //thing.save()
   // .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  //  .catch(error => res.status(400).json({ error }));
//});




app.use('/api/v1/profile', profileRoutes);
app.use('/register', stuffRoute);

module.exports=app;
