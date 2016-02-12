var mongoose = require('mongoose');

var ClienteSchema = new mongoose.Schema({
  nome: { type: String, minlength: 1, maxlength: 40 },
  cpf: { type: String, minlength: 11, maxlength: 11 },
  rg: { type: String, minlength: 9, maxlength: 11 },
  nascimento: { type: Date, default: Date.now },
  telefone: { type: String, minlength: 1, maxlength: 40 },
  celular: { type: String, minlength: 1, maxlength: 40 },
  email: { type: String, minlength: 5, maxlength: 100 },
  usuario: { type: String, minlength: 5, maxlength: 100 },
  senha: { type: String, minlength: 5, maxlength: 100 },
  perfil: { type: String, enum: ['Super Admin', 'Admin', 'Usuário Normal'] }
}, {collection: 'cliente'});

mongoose.model('ClienteSchema', ClienteSchema);