var fs = require('fs');
var request = require('request');
var _ = require('underscore');
var Table = require('cli-table');

function homeFolder(){
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
}

function readConfig(cb){
  fs.readFile(homeFolder() + '/.reportr.json', function(err, data){
    var config = JSON.parse(data)
    cb(config)
  })
}

function makeRequest(config, path, requestOptions, cb){
  opts = {url: config.host + '/api/' + config.token + path,
          json: true}
  request(_.extend(opts, requestOptions), cb)
}

function printTable(models){
  var table = new Table({head: ['Namespace', 'Name', 'Description']})
  _.map(models, function(model){ table.push(_.values(_.pick(model, 'namespace', 'name', 'description'))) })
  console.log(table.toString());
}

exports.setup = function(host, token){
  var config = {host: host, token: token}
  fs.writeFile(homeFolder() + '/.reportr.json', JSON.stringify(config), function (err) {
    if (err) throw err;
    console.log('Config written to ' + homeFolder() + '/.reportr.json');
  })
}

exports.listModels = function() {
  readConfig(function(config){
    makeRequest(config, '/models', {}, function(error, response, body){
      printTable(body.models);
    })
  })
}

exports.addModel = function(namespace, eventName, displayName, icon, description){
  var newModel = {'namespace': namespace,
                  'event': eventName,
                  'name': displayName,
                  'icon': icon,
                  'description': description}
  var qData = new Buffer(JSON.stringify(newModel)).toString('base64')
  readConfig(function(config){
    makeRequest(config, '/model/set', {qs: {data: qData}}, function(error, response, body){
      console.log(response.statusCode);
      console.log(body);
    })
  })
}

exports.track = function(namespace, eventName, properties){
  var newEvent = {'namespace': namespace,
                  'event': eventName}
  if(properties){
    newEvent['properties'] = JSON.parse(properties)
  }
  var qData = new Buffer(JSON.stringify(newEvent)).toString('base64')

  readConfig(function(config){
    makeRequest(config, '/events/track', {qs: {data: qData}}, function(error, response, body){
      console.log(response.statusCode);
      console.log(body);
    })
  })
}
