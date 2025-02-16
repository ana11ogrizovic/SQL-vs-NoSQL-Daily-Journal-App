require('dotenv').config();  // Učitaj podatke iz .env fajla

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const entryRoutes = require('./routes/entryRoutes');  // Putanja do vaših ruta

const app = express();


// Middleware za parsiranje JSON-a
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Povezivanje sa MongoDB Atlas koristeći podatke iz .env fajla
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Koristimo rute iz entryRoutes.js
app.use('/api', entryRoutes);

// Pokretanje servera na portu 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
