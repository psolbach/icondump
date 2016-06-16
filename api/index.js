#!/usr/bin/env node
'use strict';

/*
  Handles all API calls
  in either /api/<url> or /api/<url>/src form.
*/

var util = require('util')
var validUrl = require('valid-url')
var debug = require('debug')('http')
var memoize = require('memoizee')
var config = require('../config.js')
var icons = require('../icons')


// Icon lookup
function getIconMeta(path) {
  var icondata = icons();

  // Prepend CDN Url
  for (var key in icondata.icons) {
    var icon = icondata.icons[key];
    if (!icon.hasOwnProperty("src")) {
      icon.src = config.iconbin_api + icon.canonical_url + "/src";
      icon.cdn = config.cdn_baseurl + icon.path;
    }
  }

  debug("in-memory cache MISS.")
  if (!icondata.urls.hasOwnProperty(path)) return false
  else return icondata.icons[icondata.urls[path]];
}

// Icon getter w/ in-memory cache
var cachedIconMeta = memoize(getIconMeta, {
  maxAge: 2*60*1000, preFetch: true
});


module.exports = function(req, res) {
  var path = req.params._url.toLowerCase();
  var isRedirect = req.path.split("/")[3] == "src";

  // Validate requests URL
  if (!validUrl.isUri("http://" + path) && !validUrl.isUri(path)) {
    res.status(404).send("not a valid URL.");
  }

  // Sanitize URL
  var protosubmatch = /^((https?|ftp):\/\/)?(www\.)?/;
  path = path.replace(protosubmatch, '');

  // Get cached icon results
  var iconMeta = cachedIconMeta(path);

  if (isRedirect) {
    return iconMeta 
      ? res.redirect(iconMeta.cdn) // icon in db!
      : res.redirect(config.fallback_icon) // fallback!
  }

  // Valid Call
  if (iconMeta) {
    return res.json({
      w: iconMeta.w,
      h: iconMeta.h,
      content_type: iconMeta.content_type,
      canonical_url: iconMeta.canonical_url,
      src: iconMeta.src
    })
  }

  // Err
  var msg = {
    err: util.format("We couldn\'t find an icon for %s. "
    + "But you can add it at github.com/psolbach/iconbin!", path)
  };

  res.status(404).json(msg);
}