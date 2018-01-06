var express = require('express');
var router = express.Router();
var shell = require('shelljs');
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
});

//console.log(items[0]);
//player = Omx(path+"/"+items[0], "hdmi", false, 100);

//player.on('close', function () {
//    console.log("the player closed");
//});

//setTimeout(function(){

//player.on('close', function () {
//    console.log("the player closed "+getCounter());
    //setCounter(getCounter()+1);
//    player = Omx(path+"/"+getItems()[getCounter()], "hdmi", false, 100);
//    setCounter(getCounter()+1);
//    console.log(getCounter());
//    console.log(player);
//})}, 1000);

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our rest video api!' });  
});

router.get('/jump', function(req, res){
    player.fwd30();
    console.log(player);
    res.json({sucess: true});
});

router.get('/skip', function(req, res){

    setCounter(getCounter()+1);
    player.newSource(path+"/"+getItems()[getCounter()], "hdmi", false, 100);
    //setCounter(getCounter()+1);
    console.log(player);
    res.json({sucess: true});
});

router.get('/reboot', function(req, res){
    shell.exec('sudo reboot now');
    res.json({sucess: true});
});

router.get('/start', function(req, res){
    fs.readdir(path, function(err, items) {
	if(!err){
	    console.log(items);

	    for (var i=0; i<items.length; i++) {
		console.log(items[i]);
	    }

	    var player = Omx(path+"/"+items[0], "hdmi", false, 100);	    
	    res.json({sucess: true, items: items});
	}else{
	    res.json({sucess: false});
	}
    });
    
    var player = Omx('my-video.mp4');
});

router.get('/files', function(req, res){
    fs.readdir(path, function(err, items) {
	if(!err){
	console.log(items);

	for (var i=0; i<items.length; i++) {
	    console.log(items[i]);
	}
	    res.json({sucess: true, items: items});
	}else{
	    res.json({sucess: false});
	}
    });
});

module.exports = router;
