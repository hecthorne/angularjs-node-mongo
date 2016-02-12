'use strict';
/**
 * Carrega dependencias
 */
var config = require('./config')

/**
 * Aplicação principal
 */

//Inicia a aplicação express
var app = require('./express')(config);

//Inicia a aplicação na porta
app.listen(config.PORT);

// Expose app
exports = module.exports = app;

console.log('Aplicação iniciada na porta: ' + config.PORT);