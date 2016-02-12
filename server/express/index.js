'use strict';

/**
 * Configuração express
 */
var http = require('http'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	helmet = require('helmet'),
	mongoose = require('mongoose'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	loadFiles = require('../extras/load-files'),
	envelope = require('../extras/envelope'),
	path = require('path');

module.exports = function(config) {

	// Initialize express app
	var app = express();

	

	// Carrega as entidades models
	loadFiles.getGlobbedFiles('./models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Seta a url no escopo local
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});
	
	// Define o tipo de retorno e permite sobrecarga de metodos
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	//Conexão com o banco de dados
	var db = mongoose.connect(config.DB, function(err) {
		if (err) {
			console.error(chalk.red('Não foi possível connectar ao  banco de dados!'));
			console.log(chalk.red(err));
		}
	});


	// Express MongoDB
	app.use(session({
		saveUninitialized: true,
		resave: true,
		proxy: true,
		secret: config.SECRET,
  		name: config.KEY,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	//Usando o passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Configura o Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.use(helmet.frameguard('allow-from', '*'));
	app.disable('x-powered-by');

	// Configura a pasta de aplicações [static folder]
	app.use(express.static(path.join(__dirname, '/../../client')));

	// Carrega as rotas
	loadFiles.getGlobbedFiles('./routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	//401 Unauthorized
	app.use(function(err, req, res, next) {
		if (!err) return next();
		console.error(err.stack);
		envelope(res, envelope.status.InternalError, "Internal error server!" , null, err.stack);
	});

	app.use(function(req, res) {
		envelope(res, envelope.status.NotFound, 'Not found', null, req.originalUrl);
	});

	return app;
};