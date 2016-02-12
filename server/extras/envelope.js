'use strict';

/**
 * Module dependencies.
 */

module.exports = function(res, status, message , dados ,error) {
    return res.json({
			status: status,
			mensagem: message,
			dados: dados,
			error: error
	});
};

module.exports.status = {
	Sucess: 200,
	Error: 400,
	InternalError: 500,
	NotFound: 404
};