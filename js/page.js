/* jshint node: true */
/* jshint browser: true */
/* global $ */

"use strict";

$("#map").click(function() {
    $(".starter-template").load("views/map.html");
    /*	$(".map").show("slow");*/
});

$("#devices").click(function() {
    $(".starter-template").load("views/serialport.html");
    /*$(".serialport").show("slow");*/
});
