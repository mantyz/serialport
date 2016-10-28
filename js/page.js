"use strict";

let gui = require('nw.gui');
let win = gui.Window.get();

$("#map").click(function() {
	$(".starter-template").load("views/map.html", function(response, status) {
		if (status == "error") {
			console.log("error");
		} else {
			$("#map").css({
				color: "#fff",
				backgroundColor: "#202426"
			});
		}

	});
	/*	$(".map").show("slow");*/
});

$("#devices").click(function() {
	$(".starter-template").load("views/serialport.html");
	/*$(".serialport").show("slow");*/
});

$("#db").click(function() {
	$(".starter-template").load("views/db.html");
	/*$(".serialport").show("slow");*/
});

/*Проверка на выделена ли ссылка*/
function selected() {
	
}

$("#win-close").click(function() {
	win.on('close', function() {
		this.hide();
		this.close(true);
	});

	win.close();
});
