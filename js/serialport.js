"use strict";

var CALL_READY = "\r\nCall Ready\r\n";
var V110 = "AT+CBST=71,0,1;D +79117467352\r\n";
var CREG = "\r\n+CREG: 0,1\r\n\r\nOK\r\n";
var creg_time = null;

require('events').EventEmitter.prototype._maxListeners = Infinity;

var SerialPort = require('serialport');
//var fs = require('fs');



var comPort = new SerialPort("COM7", {
	autoOpen: false,
	baudrate: 19200,
	//parser: serialPort.parsers.byteDelimiter([50,53]),
	//parser: SerialPort.parsers.readline('\n')
	//parser: serialPort.parsers.byteLength(100)
});



//Open port
$("#open").click(function() {
	comPort.open(function(err) {
		if (err) {
			return $('#textarea2').append('Error opening port: ', err.message, "\n");
		} else {
			$('#textarea2').append('Port open: ', comPort.isOpen(), '\n');
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
				//console.log('cmd transmit');
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

comPort.on('data', function(data) {
	var buf = Buffer.from(data, 'utf8');
	var str = buf.toString('utf8');
	console.log(str);

	if (str == CALL_READY) {
		//console.log(CALL_READY);
		setTimeout(send, 100, "ATE0\r\n");
		creg_time = setTimeout(function tick() {
			send("AT+CREG?\r\n");
			creg_time = setTimeout(tick, 1000);
		}, 1000);
		console.log(creg_time);
	}
	if (str == CREG) {
		clearInterval(creg_time);
		console.log("creg blya");
		send(V110);
		/*while (str !== CREG) {
			setTimeout(send, 1000, "AT+CREG?\r\n");
		}*/
	}

	$('#textarea').append(str);

	var textareaId = $('.form-control');
	if (textareaId.length) {
		textareaId.scrollTop(textareaId[0].scrollHeight - textareaId.height());
	}

});


$("#dis").click(function() {
	setTimeout(comPort.close(function(err) {
		if (err) {
			return $('#textarea2').append("Error: ", err.message, "\n");
		}
		//com = null;
		$('#textarea2').append("Disconnect\n");
	}), 3000);
});

//delete require.cache[serialport];
