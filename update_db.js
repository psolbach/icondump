#!/usr/bin/env node
'use strict';

var mime = require('mime')
  , sizeOf = require('image-size')
  , filewalker = require('filewalker')
  , icons = require('./icons/icons.json')
  , urls = require('./icons/urls.json');

var parseIconFile = function(p) {
  var fp = 'icons/res/' + p;
  var fname = p.split(".");
  var meta = {}

  fname.pop();
  fname = fname.join(".");
  fname = fname.split("-")[0];
  if (fname in icons) return false; // return early
  try {
    var d = sizeOf(fp);
  }
  catch(e) {
    console.log(e);
    console.log(fp)
  }

  return {
    "canonical_url": fname,
    "content_type": mime.lookup(fp),
    "path": fp,
    "w": d.width,
    "h": d.height
  }
}

var newMetadata = {}

filewalker('./icons/res')
  .on('file', function(p, s) {
    // console.log('file: %s, %d bytes', p, s.size);
    var metadata = parseIconFile(p);
    if (metadata) newMetadata[metadata.canonical_url] = metadata;
  })
  .on('done', function() {
    console.log('done parsing %d icon files.', this.files);
    console.log(JSON.stringify(newMetadata, null, 2))
  })
.walk();