// Server Side Application

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const profileRoutes = require('./routes/profileRoutes.js');
const cors = require('cors');
const app = express();
const stuffRoute=require('./routes/stuff.js');
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

app.use('/api/v1/profile', profileRoutes);
app.use('/register', stuffRoute);

module.exports=app;
