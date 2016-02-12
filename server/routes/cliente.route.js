'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var ClienteModel = mongoose.model('ClienteSchema');

module.exports = function(app) {

	var envelope = require('../extras/envelope');

	app.route('/cliente/listar').get(function(req, res){
		ClienteModel.find({}).exec(function(err, clientes){
		      if(err) {
		      	envelope(res, envelope.status.Error, 'Não existem dados a serem exibidos!', null, err);
		      } else {
	        	envelope(res, envelope.status.Sucess, 'Consulta realizada com sucesso!', clientes, req.originalUrl);
		      }
	    });
	});

	app.route('/cliente/consultar/:id').get(function(req, res){
		var clienteId = req.params.id;
		ClienteModel.findOne({_id : clienteId }).exec(function(err, cliente){
		      if(err) {
		      	envelope(res, envelope.status.Error, 'Não existem dados a serem exibidos!', null, err);
		      } else {
	        	envelope(res, envelope.status.Sucess, 'Consulta realizada com sucesso!', cliente, req.originalUrl);
		      }
	    });
	});

	app.route('/cliente/editar').post(function(req, res){
		var query = { _id : req.body.cliente._id };
		ClienteModel.findOneAndUpdate(query, req.body.cliente, {new : true}).exec(function(err, cliente){
		      if(err) {
		      	envelope(res, envelope.status.Error, 'Não existem dados a serem exibidos!', null, err);
		      } else {
	        	envelope(res, envelope.status.Sucess, 'Consulta realizada com sucesso!', cliente, req.originalUrl);
		      }
	    });
	});

	app.route('/cliente/cadastrar').post(function(req, res){
	    var cliente = req.body.cliente;
        ClienteModel.create(cliente, function(err, cliente) {
          if(err) {
            envelope(res, envelope.status.Error, 'Erro ao realizar operação!', null, err);
          } else {
          	envelope(res, envelope.status.Sucess, 'Cadastro realizado com sucesso!', cliente, req.originalUrl);
          }
        });
	      
	});

	app.route('/cliente/remover/:id').get(function(req, res){
		var query = { _id : req.params.id };
		ClienteModel.findOneAndRemove(query).exec(function(err){
		      if(err) {
		      	envelope(res, envelope.status.Error, 'Não existem dados a serem exibidos!', null, err);
		      } else {
	        	envelope(res, envelope.status.Sucess, 'Consulta realizada com sucesso!', null, req.originalUrl);
		      }
	    });
	});

};