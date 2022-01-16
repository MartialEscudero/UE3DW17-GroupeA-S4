var express = require("express");
var router = express.Router();

var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/* GET all EU countries page. */
router.get("/eucountries", function (req, res) {
    var params = {
        TableName: "Countries",
        ProjectionExpression: "nom",
        KeyConditionExpression: "#rg = :region",
        ExpressionAttributeNames: {
            "#rg": "region",
        },
        ExpressionAttributeValues: {
            ":region": "Europe",
        },
    };
    docClient.query(params, function (err, data) {
        res.render("eucountries", {
            countries: data.Items,
        });
    });
});

/* GET african countries, sort by size */
router.get("/africa", function (req, res) {
    var params = {
        TableName: "Countries",
        IndexName: "SuperficieIndex",
        ProjectionExpression: "#rg, nom, superficie",
        KeyConditionExpression: "#rg = :rgvalue AND #sp > :value",
        ExpressionAttributeNames: {
            "#rg": "region",
            "#sp": "superficie",
        },
        ExpressionAttributeValues: {
            ":rgvalue": "Africa",
            ":value": 0,
        },
        Limit: 21,
    };
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data.Items, null, 2));
            res.render("africa", {
                countries: data.Items,
            });
        }
    });
});

/* GET all info from one country */
router.get("/onecountrie", function (req, res) {
    var params = {
        TableName: "Countries",
        FilterExpression: "#nm = :nom",
        ExpressionAttributeNames: {
            "#nm": "nom",
        },
        ExpressionAttributeValues: {
            ":nom": "Spain",
        },
    };
    docClient.scan(params, function (err, data) {
        console.log(data.Items);
        res.render("onecountrie", {
            countrie: data.Items[0],
        });
    });
});

/* GET all Dutch speaking countries */
router.get("/dutch", function (req, res) {
    var params = {
        TableName: "Countries",
        FilterExpression: "langues.nld = :lg",
        ExpressionAttributeValues: {
            ":lg": "Dutch",
        },
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data.Items, null, 2));
            res.render("dutch", {
                countries: data.Items,
            });
        }
    });
});

/* GET names of countries that start with a "P" letter */
router.get("/startwithp", function (req, res) {
    var params = {
        TableName: "Countries",
        FilterExpression: "#nm between :start_letter and :end_letter",
        ExpressionAttributeNames: {
            "#nm": "nom",
        },
        ExpressionAttributeValues: {
            ":start_letter":"P",
            ":end_letter":"Q",
        },
    };
    docClient.scan(params, function (err, data) {
        console.log(data.Items);
        res.render("startwithp", {
            countries: data.Items,
        });
    });
});

/* GET names and area of countries with an area between 400,000 and 500,000 km2 */
router.get("/areacountries", function (req, res) {
    var params = {
        TableName: "Countries",
        FilterExpression: "#sp between :start_number and :end_number",
        ExpressionAttributeNames: {
            "#sp": "superficie",
        },
        ExpressionAttributeValues: {
            ":start_number":400000,
            ":end_number":500000,
        },
    };
    docClient.scan(params, function (err, data) {
        console.log(data.Items);
        res.render("areacountries", {
            countries: data.Items,
        });
    });
});

module.exports = router;