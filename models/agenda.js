const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgendaSchema = new Schema({
    nome: {type: String, require: true, max:100},
    email: {type: String, require: true},
    sala: {type: String, required: true},
    dia: {type: String, required: true, max: 10},
    hora: {type: String, require: true, max: 4}
})

module.exports = mongoose.model('Agenda', AgendaSchema);