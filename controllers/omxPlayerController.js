var express = require('express');
var fs = require('fs');
var Omx = require('node-omxplayer');
var player = null;
var i = 0;
var count = 0;
var items = [];

var path = "./Videos/";

function setCounter(k){
    i = k%count;
}

function setCount(k){
    count = k;
}

function getCounter(){
    return i;
}

function getCount(){
    return count;
}

function getItems(){
    return items;
}

function setItems(item){
    items = item;
}

fs.readdir(path, function(err, items) {
    if(!err){
	//console.log(items);

	for(var i = 0; i < items.length; i++){
	    if(!(/\.(mp4|avi|mkv|mpeg)$/i).test(items[i])){
		items.splice(i, 1);
	    }
	}

	console.log(items);

	setItems(items);

	setCount(items.length);

	//player = Omx(path+"/"+items[i], "hdmi", false, 100);

	//console.log(items[0]);
	if(items.length > 0){
	player = Omx(path+"/"+items[0], "hdmi", false, 100);

	player.on('close', function () {
	    console.log("the player closed");
	});
	}

	setTimeout(function(){

	    player.on('close', function () {
		console.log("the player closed "+getCounter());
		setCounter(getCounter()+1);
		player = Omx(path+"/"+getItems()[getCounter()], "hdmi", false, 100);
		//setCounter(getCounter()+1);
		console.log(getCounter());
		console.log(player);
	    })}, 1000);
	
    }else{
	console.log(err);
    }

    player.getItems = function (){
        return items;
    }


});


module.exports = player;
