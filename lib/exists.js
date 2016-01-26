'use strict';

var spawn = require('./spawn');

var which = process.platform === 'win32' ? 'where.exe' : 'which';

exports.async = function async(cmd, callback) {
	spawn.async(which, [cmd], null, function (err, out, code) {
		callback(!err);
	});
};

exports.sync = function sync(cmd) {

	try {
		spawn.sync(which, [cmd]);
		return true;

	} catch (e) {
		return false;
	}
};
