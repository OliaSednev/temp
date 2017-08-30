"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// *************** Login ************************
app.post('/api/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var dbName = '';
    var dbPassword = '';
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '5tgb6yhn',
        database: 'whizzco'
    });
    connection.connect();
    connection.query('SELECT * from users where name = ?', [username], function (err, rows, fields) {
        if (!err) {
            if (rows.length === 0) {
                res.status(500).send('invalid credentials');
                return;
            }
            dbName = rows[0].name;
            dbPassword = rows[0].password;
            if (password === dbPassword) {
                var newUser = {
                    user: {
                        name: username,
                        role: "",
                        permissions: ["permissions"],
                    },
                    token: "112233",
                    expiresOn: new Date()
                };
                res.json({ info: 'User is approved', data: newUser });
            }
            else {
                res.status(500).send('invalid credentials');
            }
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});
// *************** Dashboard ************************
app.get('/api/dashboard', function (req, res) {
    var dashBoardData = {
        'impressisons': 10877,
        'clicks': 1236,
        'ctr': '11.2%',
        'ecpm': '4.5$',
        'pieChartData1': {
            'pieChartLabels': ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Cars Sales', 'Computers Sales', 'Houses Sales'],
            'pieChartData': [300, 500, 100, 100, 50, 700]
        },
        'pieChartData2': {
            'pieChartLabels': ['At&T forecast', 'Amdocs forecast', 'Yahoo forecast', 'Google forecast', 'Intel forecast', 'Microsoft forecast'],
            'pieChartData': [300, 500, 100, 200, 800, 1600]
        },
        'lineChartData': {
            'lineChartData': [
                { data: [65, 59, 80, 81, 56, 55, 40], label: 'CTR' },
                { data: [28, 48, 40, 19, 86, 27, 90], label: 'Clicks' },
                { data: [18, 48, 77, 9, 100, 27, 40], label: 'eCPM' },
                { data: [22, 33, 55, 9, 100, 22, 11], label: 'Impressions' }
            ], 'lineChartLabels': ['', '', '', '', '', '', '']
        }
    };
    res.json({ info: 'Dashboard data found successfully', data: dashBoardData });
});
// *************** Websites ************************
app.get('/api/websites', function (req, res) {
    var websitesData = [
        {
            'id': '1',
            'website': 'Cnn.com',
            'impressions': 2566,
            'clicks': 189
        },
        {
            'id': '2',
            'website': 'Ynet.co.il',
            'impressions': 3459,
            'clicks': 329
        },
        {
            'id': '3',
            'website': 'tmz.com',
            'impressions': 2566,
            'clicks': 189
        },
        {
            'id': '4',
            'website': 'Forbes.com',
            'impressions': 2566,
            'clicks': 189
        }
    ];
    res.json({ info: 'Dashboard data found successfully', data: websitesData });
});
app.get('/api/websites/:id', function (req, res) {
    var websiteId = req.params.id;
    var website = '';
    var impressionsDelta = 0;
    var clicksDelta = 0;
    switch (websiteId) {
        case '1':
            website = 'Cnn.com';
            impressionsDelta = 10;
            clicksDelta = 40;
            break;
        case '2':
            website = 'Ynet.co.il';
            impressionsDelta = 20;
            clicksDelta = 30;
            break;
        case '3':
            website = 'tmz.com';
            impressionsDelta = 30;
            clicksDelta = 20;
            break;
        case '4':
            website = 'Forbes.com';
            impressionsDelta = 40;
            clicksDelta = 10;
            break;
    }
    var campaignData = [
        {
            'brand': 'Nike',
            'website': website,
            'impressions': 2566 + impressionsDelta,
            'clicks': 189 + clicksDelta
        },
        {
            'brand': 'Coca Cola',
            'website': website,
            'impressions': 3459 + impressionsDelta,
            'clicks': 329 + clicksDelta
        },
        {
            'brand': 'Lotto',
            'website': website,
            'impressions': 3566 + impressionsDelta,
            'clicks': 189 + clicksDelta
        },
        {
            'brand': 'Wix',
            'website': website,
            'impressions': 1566 + impressionsDelta,
            'clicks': 189 + clicksDelta
        }
    ];
    return res.json({ info: 'campaign data found successfully', data: campaignData });
});
var server = app.listen(4005, function () {
    console.log('Server listening on port 4005');
});
//# sourceMappingURL=index.js.map