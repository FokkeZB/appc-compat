'use strict';

var child_process = require('child_process');

var deasync = require('deasync');

exports.async = function async(cmd, args, opts, callback) {

	if (process.platform === 'win32') {
		args = ['/c', cmd].concat(args);
		cmd = process.env.comspec;
	}

	var childProcess = child_process.spawn(cmd, args, opts || {});

	if (callback) {
		var stdout = '';
		var stderr = '';

		// null if cmd does not exist
		childProcess.stdout && childProcess.stdout.on('data', function (data) {
			stdout += data.toString();
		});

		// null if cmd does not exist
		childProcess.stderr && childProcess.stderr.on('data', function (data) {
			stderr += data.toString();
		});

		childProcess.on('close', function (code) {
			callback(code !== 0, stdout, stderr);
		});

		// fired when cmd does not exist, throwing exception when not listened to
		childProcess.on('error', function (err) {
			callback(err, stdout, stderr);
		});
	}

	return childProcess;
};

exports.sync = function sync(cmd, args, opts) {
	var done = false;
	var res;

	exports.async(cmd, args, opts, function () {
		done = true;
		res = Array.prototype.slice.call(arguments);
	});

	deasync.loopWhile(function () {
		return !done;
	});

	if (res[0]) {
		throw res[2];
	}

	return res[1];
};
