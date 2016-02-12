'use strict';

var _ = require('lodash'),
	glob = require('glob');

/**
 * Obtém os arquivos
 */
module.exports.getGlobbedFiles = function(patterns, removeRoot) {
	
	var _this = this;

	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	var output = [];

	if (_.isArray(patterns)) {
		patterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(patterns)) {
		if (urlRegex.test(patterns)) {
			output.push(patterns);
		} else {
			glob(patterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};