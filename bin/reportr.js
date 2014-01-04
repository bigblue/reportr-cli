#!/usr/bin/env node

'use strict';

process.title = 'reportr';

var program = require('commander');
var cli = require('../lib/cli');

program.version('0.0.1')

program
  .command('setup')
  .description('Save config to home directory')
  .option('-o, --host <hostname>', 'Reportr instance hostname e.g. http://www.reportr.io', 'http://www.reportr.io')
  .option('-t, --token <api token>', 'Reportr api token')
  .action(function(options){
    cli.setup(options.host, options.token)
  })

program
  .command('list-models')
  .description('List current models')
  .action(function(){
    cli.listModels();
  })

program
  .command('add-model')
  .description('Create new model')
  .option('-n, --namespace <namespace>', 'Event namespace')
  .option('-e, --event <event>', 'Event name')
  .option('-d, --display <name>', 'Display name')
  .option('-i, --icon <url>', 'Url for a 64x64 icon image')
  .option('-t, --text <description>', 'Description text for event')
  .action(function(options){
    cli.addModel(options.namespace, options.event, options.display, options.icon, options.text);
  })

program
  .command('track')
  .description('Log new event')
  .option('-n, --namespace <namespace>', 'Event namespace')
  .option('-e, --event <event>', 'Event name')
  .option('-p, --properties <properties>', 'JSON encoded properties')
  .action(function(options){
    cli.track(options.namespace, options.event, options.properties)
  })

program.parse(process.argv);
