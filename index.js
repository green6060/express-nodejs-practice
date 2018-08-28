//our app's entry point.
//loads express into our app, and runs the express(), saving it into 'var app'
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

//our app's endpoint
//tells the app what to do when we hit endpoint '/'. 

// Here, we call the .sendFile helper method, sending it the _dirname(or the current approot directory) + '/index.html'
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//Here, we read the json file with .readFile, specify what and how we read it (products.json, and UTF-8), 
//then use the function to specify what to do with it
app.get('/products', function(req,res) {
  fs.readFile('products.json', 'utf-8', function(err, data) {
    var products = JSON.parse(data);
    res.locals = { products: products};
    res.render('products.ejs');
  })
})

app.get('/products/:id', function(req, res) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var productsParsed = JSON.parse(data);
    var product = productsParsed.filter( function(obj) {
      return obj.id === parseInt(req.params.id);
    });
   
    if (product.length)
      product = product[0];
    else
      product = null;
 
    res.locals = { product: product };
    res.render('product.ejs');
 });
});

app.listen(8000);