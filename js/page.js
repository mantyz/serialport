/* jshint node: true */
/* jshint browser: true */
/* global $ */

"use strict";

$("#map").click(function() {
	$(".starter-template").load("views/map.html", function(response, status, xhr) {
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
