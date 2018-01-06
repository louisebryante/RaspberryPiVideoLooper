var express = require('express');
var router = express.Router();
var shell = require('shelljs');
var fs = require('fs');
var player = require('../controllers/omxPlayerController');

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

    player.setCounter(player.getCounter()+1);
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
