import * as express from "express";
import * as bodyParser from "body-parser";
import Drawing = require("./models/Drawing");
import User = require("./models/User");

var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Astralink",{useMongoClient: true});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// *************** Login ************************

app.post('/api/login', function (req, res) {

    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;

    var query = { name: username};

    User.findOne(query, function(err, User) {

        if (err) {
            res.json({info: 'error during find User', error: err});
        };
        if (User) {
            if (password === User.password) {
                res.json({info: 'User is approved', data: User});
            }
            else {
                res.status(500).send('invalid credentials')
            }
        } else {
            res.json({info: 'User not found with name:'+ req.params.name});
        }
    });
});

// *************** Drawings ************************

/* Read all */
app.get('/api/drawings', function (req, res) {

    Drawing.find((err, Drawings) => {
        if (err) {
            console.log("error");
            res.json({info: 'error during find Drawings', error: err});
        };

        res.json({info: 'Drawings found successfully', data: Drawings});
    });
});

/* Find one */
app.get('/api/drawings/:id', function (req, res) {

    var query = { _id: req.params.id};

    Drawing.findOne(query, function(err, Drawing) {

        if (err) {
            res.json({info: 'error during find Drawing', error: err});
        };
        if (Drawing) {
            res.json({info: 'Drawing found successfully', data: Drawing});
        } else {
            res.json({info: 'Drawing not found with id:'+ req.params._id});
        }
    });
});

/* Save */
app.post('/api/drawings', function (req, res) {

    var newDrawing = new Drawing(req.body);

    newDrawing.save((err)=>{
        if (err){
            res.json({info: 'error during Drawing save', error: err});
        }
        res.json({info: 'Drawing saved successfully', data: newDrawing});
    });
});

/* Delete */
app.delete('/api/drawings', function (req, res) {

    var drawingToDelete = new Drawing(req.body);

    var query = {_id: drawingToDelete._id};

    Drawing.remove(query, function (err) {

        if (err) {
            console.log("in delete - user wasn't removed!!!");
            res.json({info: 'error during deleting drawing', error: err});
        }
        else
        {
            res.json({info: 'Drawing deleted successfully', data: drawingToDelete});
        }
    });

});

var server = app.listen(4010, function () {
    console.log('Server listening on port 4010');
});