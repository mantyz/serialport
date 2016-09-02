/* jshint node: true */
/* jshint browser: true */
/* global $ */

'use strict';

require('events').EventEmitter.prototype._maxListeners = Infinity;


var SerialPort = require('serialport');
var fs = require('fs');
var gui = require('nw.gui');

var win = gui.Window.get();

//List ports
var com;

SerialPort.list(function(err, ports) {
	ports.forEach(function(port, i) {
		$("#select").append($('<option value="' + i + '">' + port.comName + '</option>'));
		//$("#select").append($('<option value="' + i + '">' + port.comName + '</option>'));
	});
	com = $("#select option:selected").text();
	//var comports = com.toString();
	console.log(com);
});

console.log(com);

var comPort = new SerialPort(com, {
	autoOpen: false,
	baudrate: 19200,
	//parser: serialPort.parsers.byteDelimiter([50,53]),
	//parser: SerialPort.parsers.readline("\r\n"),
	//parser: serialPort.parsers.byteLength(100)
});


var writerStream = fs.createWriteStream("../tmp/test1.txt");

//var binBuf = new Buffer();

//Open port
$("#open").click(function() {
	comPort.open(function(err) {
		if (err) {
			return $('#textarea2').append('Error opening port: ', err.message, "\n");
		} else {
			$('#textarea2').append('Port open\n');
			$('#textarea2').append(comPort.isOpen(), "\n");
		}
	});
});

//Send command to device
function send(string) {
	if (comPort.isOpen()) {
		comPort.write(string + "\r\n", function(err) {
			if (err) {
				return console.log('Write error: ', err.message);
			} else {
				console.log('cmd transmit');
				//$('#textarea2').append('cmd transmit\n');
			}
		});
	} else {
		$('#textarea2').append('Port close.\n');
	}
}

$('#send').click(function() {
	var text = $('#input_txt').val();
	var string = text.toString('UTF8');
	send(string);
	$('#textarea2').append(string, "\n");
});
/*comPort.on('open', function() {
	var text = $('#input_txt').val();
	var string = text.toString('UTF8');

	var timer = setTimeout(function tick() {

		if (comPort.isOpen()) {

			comPort.write(string + "\r\n", function(err) {
				if (err) {
					return console.log('Write error: ', err.message);
				}

				console.log('cmd transmit', text);
				$('#textarea2').append('cmd transmit\n');
			});

			timer = setTimeout(tick, 2000);
		} else {
			clearTimeout(timer);
			$('#textarea2').append('Port close. Timer stop\n');
			console.log(timer);
		}
	}, 2000);

});*/

comPort.on('data', function(data) {

	var buf = new Buffer(data, 'utf8');
	var str = buf.toString('utf8');
	//console.log(str);

	$('#textarea').append(str);

	var textareaId = $('.form-control');
	if (textareaId.length) {
		textareaId.scrollTop(textareaId[0].scrollHeight - textareaId.height());
	}

	writerStream.write(str, 'utf8', function(err) {
		//writerStream.end();
	});
	writerStream.on('finish', function() {
		//console.log('Write completed');
	});
	writerStream.on('error', function(err) {
		//console.log(err.stack);
	});
});


$("#dis").click(function() {
	comPort.close(function(err) {
		if (err) {
			return $('#textarea2').append("Error: ", err.message, "\n");
		}
		$('#textarea2').append("Disconnect\n");
	});
});


$("#win-close").click(function() {
	win.on('close', function() {
		this.hide();
		this.close(true);
	});

	win.close();
});
