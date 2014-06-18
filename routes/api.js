var express = require('express'),
    router = express.Router(),
    http = require('http'),
    xml2js = require('xml2js'),
    xmlStream = require('xml-stream'),
    mongo = require('mongodb'),
    mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

router.get('/bikeshare', function(req, res) {
    var bikeshare = {
        host: 'www.bikesharetoronto.com',
        path: '/data/stations/bikeStations.xml'
    };

    var request = http.get(bikeshare).on('response', function(response){
        xml = new xmlStream(response);
        bikeshare = {"stations":[]};
        xml.on("updateElement: station", function(station){
            bikeshare.stations.push(station);
        });
        xml.on('end', function(data){
            res.status(200);
            res.send(bikeshare);
        });
    });
});

module.exports = router;
