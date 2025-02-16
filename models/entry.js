const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Polje je obavezno
    },
    content: {
        type: String,
        required: true,  // Polje je obavezno
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
