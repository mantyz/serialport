/* jshint node: true */
/* jshint browser: true */
/* global $ */

"use strict";

var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: '20',
	host: 'localhost',
	user: 'root',
	password: 'masterkey',
	database: 'bin',
	//stringifyObjects: true
});



var add = {
	id: 8,
	command_index: '888',
	command_name: '+VER_INFO=?'
};

function select_db() {
	var str;
	var obj;
	var i = 0;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('error connecting:' + err.stack);
			return;
		}
		console.log('connected as id' + connection.threadId);

		var query = connection.query('SELECT * FROM commands', function(err, results) {
			if (err) throw err;
			str = JSON.stringify(results);
			obj = JSON.parse(str);
			do {
				console.log(obj[i]);
				$('#textarea_db').append(obj[i].command_name, '\n');
				i++;
			} while (obj[i].command_index !== undefined);

			connection.release();

		});
		//connection.destroy();
		console.log(query.sql);
	});

}

$(document).ready(function() {
	$(document).on('click', '#select', select_db);
});
