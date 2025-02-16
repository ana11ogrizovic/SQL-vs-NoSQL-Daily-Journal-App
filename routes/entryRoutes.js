const express = require('express');
const router = express.Router();
const Entry = require('../models/entry'); // Putanja do modela za unos

// Kreiranje novog zapisa
router.post('/entries', async (req, res) => {
    try {
        const entry = new Entry(req.body); // Kreirajte novi zapis
        await entry.save(); // Spasite ga u bazu
        res.status(201).send(entry); // Pošaljite odgovor
    } catch (err) {
        res.status(400).send(err);
    }
});

// Dohvatanje svih zapisa
router.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find(); // Pronađite sve zapise
        res.status(200).send(entries); // Pošaljite ih kao odgovor
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT metoda za ažuriranje zapisa po ID-u
router.put('/entries/:id', async (req, res) => {
    console.log('PUT zahtev za ID:', req.params.id); // Logovanje ID-a koji dolazi iz URL-a

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedEntry) {
            console.log('Zapis sa datim ID-em nije pronađen'); // Logovanje ako zapis nije pronađen
            return res.status(404).json({ message: 'Entry not found' });
        }

        console.log('Zapis ažuriran:', updatedEntry); // Logovanje uspešnog ažuriranja
        res.status(200).json(updatedEntry); // Pošaljite ažurirani zapis kao odgovor
    } catch (err) {
        console.log('Greška pri ažuriranju:', err); // Logovanje greške
        res.status(500).json({ message: 'Error updating entry', error: err });
    }
});

// DELETE metoda za brisanje zapisa po ID-u
router.delete('/entries/:id', async (req, res) => {
    console.log('DELETE zahtev za ID:', req.params.id); // Logovanje ID-a koji dolazi iz URL-a

    try {
        const entry = await Entry.findByIdAndDelete(req.params.id);
        
        if (!entry) {
            console.log('Zapis sa datim ID-em nije pronađen'); // Logovanje ako zapis nije pronađen
            return res.status(404).json({ message: 'Entry not found' });
        }

        console.log('Zapis obrisan:', entry); // Logovanje uspešnog brisanja
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (err) {
        console.log('Greška pri brisanju:', err); // Logovanje greške
        res.status(500).json({ message: 'Error deleting entry', error: err });
    }
});

// PATCH metoda za ažuriranje postojećeg zapisa
router.patch('/entries/:id', async (req, res) => {
    try {
        // Koristimo Mongoose da pronađemo zapis po ID-u i ažuriramo ga
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,   // ID zapisa koji želimo da ažuriramo
            req.body,         // Novi podaci koje želimo da ažuriramo (dozvoljeno je da se šalje samo ono što treba da se menja)
            { new: true }     // Ova opcija vraća ažurirani zapis nakon što je izmena obavljena
        );

        // Ako zapis nije pronađen
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Ako je izmena uspela, šaljemo ažurirani zapis kao odgovor
        res.status(200).json(updatedEntry);
    } catch (err) {
        // Ako dođe do greške, vraćamo grešku
        res.status(500).json({ message: 'Error updating entry', error: err });
    }
});


module.exports = router;
