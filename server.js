#!/usr/bin/env node
'use strict';

/*
  Example webserver using the iconbin api module.
*/

var express = require('express')
var api = require('./api')
var app = express();

app.get([
  "/api/:_url", // Returns JSON object with icon meta
  "/api/:_url/src" // Returns redirect to image source
  ], api)

// Start Serving
var server = app.listen(3007, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('listening at http://%s:%s', host, port)
})
