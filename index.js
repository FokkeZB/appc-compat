'use strict';

var spawn = require('./lib/spawn');
var exists = require('./lib/exists');

var hasAppc, hasTi, hasAlloy, hasAcs;

exports.spawn = function (cmd, args, opts, callback) {

	if (typeof opts === 'function') {
		callback = opts;
		opts = null;
	}

	opts = opts || {};

	if (cmd === 'titanium') {
		cmd = 'ti';
	}

	if (cmd !== 'appc' && ((opts.preferAppc && exports.hasAppc) || !exports['has' + cmd[0].toUpperCase() + cmd.substr(1)])) {
		args.unshift(cmd);
		cmd = 'appc';
	}

	delete opts.preferAppc;

	return spawn.async(cmd, args, opts, callback);
};

exports.spawnSync = function (cmd, args, opts) {
	opts = opts || {};

	if (cmd === 'titanium') {
		cmd = 'ti';
	}

	if (cmd !== 'appc' && ((opts.preferAppc && hasAppc) || !exports['has' + cmd[0].toUpperCase() + cmd.substr(1)])) {
		args.unshift(cmd);
		cmd = 'appc';
	}

	delete opts.preferAppc;

	return spawn.sync(cmd, args, opts);
};

exports.ti = exports.titanium = function (args, opts, callback) {
	return exports.spawn('ti', args, opts, callback);
};

exports.tiSync = exports.titaniumSync = function (args, opts) {
	return exports.spawnSync('ti', args, opts);
};

exports.alloy = function (args, opts, callback) {
	return exports.spawn('alloy', args, opts, callback);
};

exports.alloySync = function (args, opts) {
	return exports.spawnSync('alloy', args, opts);
};

exports.acs = function (args, opts, callback) {
	return exports.spawn('acs', args, opts, callback);
};

exports.acsSync = function (args, opts) {
	return exports.spawnSync('acs', args, opts);
};

Object.defineProperty(exports, 'hasAppc', {
	get: function get() {

		if (typeof hasAppc === 'boolean') {
			return hasAppc;
		}

		hasAppc = exists.sync('appc');

		return hasAppc;
	}
});

Object.defineProperty(exports, 'hasTi', {
	get: function get() {

		if (typeof hasTi === 'boolean') {
			return hasTi;
		}

		hasTi = exists.sync('titanium');

		return hasTi;
	}
});

Object.defineProperty(exports, 'hasAlloy', {
	get: function get() {

		if (typeof hasAlloy === 'boolean') {
			return hasAlloy;
		}

		hasAlloy = exists.sync('alloy');

		return hasAlloy;
	}
});

Object.defineProperty(exports, 'hasAcs', {
	get: function get() {

		if (typeof hasAcs === 'boolean') {
			return hasAcs;
		}

		hasAcs = exists.sync('acs');

		return hasAcs;
	}
});

Object.defineProperty(exports, 'hasTitanium', {
	get: function get() {
		return exports.hasTi;
	}
});
