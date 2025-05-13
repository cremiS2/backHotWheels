const mongoose = require('mongoose');

const HotSchema = new mongoose.Schema({
  nome:   { type: String, required: true },
  modelo: { type: String, required: true },
  ano:    { type: Number, required: true },
  imagem: { type: String, required: true },
});

module.exports = mongoose.model('Hot', HotSchema);
