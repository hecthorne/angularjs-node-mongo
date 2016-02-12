'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var ClienteModel = mongoose.model('ClienteSchema');

module.exports = function(app) {

	var envelope = require('../extras/envelope'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

	/**
    * Serializa um usuário para o passport.
    */
	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	/**
	* Deserializa um usuário para o passport.
	*/
	passport.deserializeUser(function(obj, done) {
	    done(null, obj);
	});

	/**
   * Passport local strategy para autenticar usuário.
   */
	passport.use(new LocalStrategy({
	   		usernameField : 'usuario',
	   		passwordField : 'senha'
		},
		function(usuario, senha, done) {
		    ClienteModel.findOne({usuario: usuario, senha: senha}, function(err, usuario){
		      if(err) {
		        return done(null, false, {mensagem:err, status:"n"});
		      } else if(!usuario) {
		        return done(null, false, {mensagem:"O usuário não existe.", status:"n"});
		      } else {
		        return done(null, usuario);
		      }
		    });
		  }
	));

  /**
  * Autenticar usuário locamente.
  */
  app.route('/user/autenticar').post(function(req, res, next) {
	    passport.authenticate('local', function(err, usuario, resposta) {
	      if (err) {
	        return next(err);
	      }
	      if (!usuario) {
	        res.json(resposta);
	      } else {
	        req.logIn(usuario, function(err) {
	          if (err) {
	            return next(err);
	          }
	          return envelope(res, envelope.status.Sucess, 'Usuário autenticado!', usuario, null);
	        });
	      }
	    })(req, res, next);
    });

   /**
   * Verificar se um usuário está autenticado.
   */
    app.route('/user/autenticado').get(function(req, res){
    	//console.log(res.json(req));
    	console.log(req);
	    if(req.user) {
		      if(req.user.senha) {
		        delete req.user.senha;
		      }
		      envelope(res, envelope.status.Sucess, 'Usuário autenticado!', { usuario: req.user}, null);
		} else {
	  		envelope(res, envelope.status.Error, 'Usuário não autenticado!', { }, null);
		}
    });

	/**
	* Deslogar usuário.
	*/
	app.route('/user/sair').get(function(req, res){
	    req.logout();
	    res.redirect('/');
	});

};