'use strict';

var spawn = require('./spawn');

exports.async = function async(cmd, callback) {
	spawn.async(process.platform === 'win32' ? 'where' : 'which', [cmd], null, function (err, stdout, stderr) {
		callback(!err);
	});
};

exports.sync = function sync(cmd) {

	try {
		spawn.sync('which', [cmd]);
		return true;

	} catch (e) {
		return false;
	}
};
