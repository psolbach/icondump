#!/usr/bin/env node
'use strict';

var debug = require('debug')('http')
  , reload = require('require-reload')(require)
  , icons = reload('./icons.json')
  , urls = reload('./urls.json');


// Refresh
setInterval(function() {
  debug('[+] Delete, refresh of icon metadata fired.');
  icons = reload('./icons.json'); // Reload metadata
  urls = reload('./urls.json'); // Reload paths  
}, 2*60*1000)

module.exports = function() {
  return {
    icons: icons,
    urls: urls
  }
}