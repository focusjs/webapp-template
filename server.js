/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var env = require('./lib/vsf/environment');
var express = require('express');
var app = express.createServer();

// use winston for logging
var winston = require('winston');

// Configuration
//basic html handling as jade
app.register('.html', require('jade'));

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
});


app.configure('dev', function () {
  app.use(express.static(__dirname + '/webapp'));
  app.use(express.static(__dirname + '/test'));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('prod', function () {
  app.use(express.static(__dirname + '/public'));
  winston.handleExceptions();
});

app.listen(env.port(), function() {
  console.log('Listening on port: ' + env.port());
});
