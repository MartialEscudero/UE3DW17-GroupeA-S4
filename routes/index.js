var express = require('express');
var router = express.Router();

var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/eucountries', function(req, res) {
  var params = {
    TableName : "Countries",
    ProjectionExpression: "nom",
    KeyConditionExpression: "#rg = :region",
    ExpressionAttributeNames:{
        "#rg": "region"
    },
    ExpressionAttributeValues: {
        ":region": "Europe"
    }
  };
  docClient.query(params, function(err, data) {
    res.render('eucountries', {
      "countries" : data.Items
    });
  });
});

router.get('/onecountrie', function(req, res) {
  var params = {
    TableName : "Countries",
    FilterExpression: "#nm = :nom",
    ExpressionAttributeNames:{
        "#nm": "nom"
    },
    ExpressionAttributeValues: {
        ":nom": "Spain"
    }
  };
  docClient.scan(params, function(err, data) {
    console.log(data.Items)
    res.render('onecountrie', {
      "countrie" : data.Items
    });
  });
});

module.exports = router;