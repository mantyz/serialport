/* jslint node: true */
/* jshint node: true */
/* jshint strict: false */

'use strict';

var os = require('os');
var fs = require('fs');
//var Buffer = require('buffer').Buffer;
var cpuArch = os.arch();
var cpuCore = os.cpus();
var memOs = os.totalmem();
var relOs = os.release();
var osType = os.type();
var netInt = os.networkInterfaces();

var gb = Math.pow(1024, 3);
var memGb = memOs / gb;

var writerStream = fs.createWriteStream("../tmp/log.txt");
//var buf1 = new Buffer (osType+"\n");
//var buf1 = new Buffer (2048);
//buf1.write(netInt.toString());
//console.log(buf1.toString('hex'));
/*var buf2 = new Buffer (memGb.toFixed(2)+" GiB");
var buf3 = Buffer.concat([buf1, buf2]);
			var str = buf3.toString('utf8');
			console.log(str);
*/
writerStream.write(netInt.toString(), 'utf8', function (err) {
			writerStream.end();
});
writerStream.on('finish', function () {
			console.log('Write completed');
});
writerStream.on('error', function (err) {
			console.log(err.stack);
});

//console.log(osType);
//console.log("RAM", memGb.toFixed(2), "\bGiB");
console.log(netInt);