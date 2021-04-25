
const aws = require('aws-sdk');
var docClient;

const setEndpoint = (e) => {
    let dynamodbConfig = {region: 'ap-northeast-1'}
    if (e != ""){
        dynamodbConfig.endpoint = e;
    }
    docClient = new aws.DynamoDB.DocumentClient(dynamodbConfig);

}




const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express  = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // ファイルモジュールを読み込む
    const fs = require('fs');

    // ファイルを読み込んだら、コールバック関数を実行する。
    fs.readFile('index.html', 'utf-8' , doReard );
    
    // コンテンツを表示する。
    function doReard(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
});
router.get('/initold', function(req, res) {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    const number = [
        {number: 100, color:"red", memo: "てすと１"}
        ,{number: 200, color:"red", memo: "てすと２"}
        ,{number: 300, color:"red", memo: "てすと３"}
    ];

    res.send(number);
});

router.get('/init2', function(req, res) {

    
      var params = {
        TableName : 'test',
        Key: {
            'pk': '1',
            'sk': '111'
        }
      };
    
       docClient.get(params, function(err, data) {
            if (err){
                console.log(err);
    res.send("error");

            } else {
                console.log(data);
    res.send(data);

            }
        });


    res.set({ 'Access-Control-Allow-Origin': '*' });

});


router.post('/post', jsonParser, function(req, res) {

    const date = new Date();
    const date1 = date.getFullYear() + 
    ('0' + (date.getMonth() + 1)).slice(-2) + 
    ('0' + date.getDate()).slice(-2)  + 
    ('0' + date.getHours()).slice(-2)  + 
    ('0' + date.getMinutes()).slice(-2)  + 
    ('0' + date.getSeconds()).slice(-2) + 
    ('0' + date.getMilliseconds()).slice(-2);

    const params = {
      TableName : 'test',
      Item:{
          pk: "1",
          sk: date1,
          number: req.body.number,
          memo: req.body.memo,
          color: req.body.color
      }
    };
  
     docClient.put(params, function(err, data) {
          if (err){
              console.log(err);

          } else {
            res.send("OK");



          }
      });


  res.set({ 'Access-Control-Allow-Origin': '*' });

});


router.post('/update', jsonParser, function(req, res) {


    const params = {
        TableName: 'test',
        Key:{
            "pk": req.body.pk,
            "sk": req.body.sk
        },
        UpdateExpression: "set color = :c",
        ExpressionAttributeValues:{
            ":c": req.body.color
        },
        ReturnValues:"UPDATED_NEW"
    };
  
     docClient.update(params, function(err, data) {
          if (err){
              console.log(err);

          } else {
            res.send("OK");



          }
      });


  res.set({ 'Access-Control-Allow-Origin': '*' });

});


router.get('/init', function(req, res) {

    
    const params = {
      TableName : 'test',
      ExpressionAttributeNames:{'#y': 'pk'},
      ExpressionAttributeValues:{':val': '1'},
      KeyConditionExpression: '#y = :val'//検索対象が満たすべき条件を指定
    };
  
     docClient.query(params, function(err, data) {
          if (err){
              console.log(err);
                res.send(err);

          } else {
                res.send(data.Items);

          }
      });


  res.set({ 'Access-Control-Allow-Origin': '*' });

});

module.exports.router = router;
module.exports.setEndpoint = setEndpoint;