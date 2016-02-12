var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 100, required: true },
  email: { type: String, minlength: 5, maxlength: 100 }
}, {collection: 'usuario'});

mongoose.model('Usuario', UsuarioSchema);