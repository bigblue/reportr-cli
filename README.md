#reportr-cli

A command line utility for tracking events with [reportr.io][]. (Can also be used when running your own instance of reportr).

## Installation and setup

``` bash
  $ [sudo] npm install reportr-cli -g
  $ reportr setup --host="http://www.reportr.io" --token="<your api token>"
```

## Usage

### List models

``` bash
  $ reportr list-models
```

### Add new model

``` bash
  $ reportr add-model -h
    Usage: add-model [options]

    Options:

      -h, --help                   output usage information
      -n, --namespace <namespace>  Event namespace
      -e, --event <event>          Event name
      -d, --display <name>         Display name
      -i, --icon <url>             Url for a 64x64 icon image
      -t, --text <description>     Description text for event
```

### Track event

``` bash
  $ reportr track -h
    Usage: track [options]

    Options:

      -h, --help                     output usage information
      -n, --namespace <namespace>    Event namespace
      -e, --event <event>            Event name
      -p, --properties <properties>  JSON encoded properties
```

[reportr.io]: http://wwww.reportr.io
