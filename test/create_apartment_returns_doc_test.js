// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../server'),
  couchdb = app.db,
  sys = require('sys'),
  querystring = require('querystring'),
  helpers = require('./helpers');

module.exports = {
  'POST /apartments gets position and stores doc': function(assert){
    var doc, google_query;
    couchdb.saveDoc = function(_doc, callback) {
      doc = _doc; 
      callback();
    };
    
    var hl_http_client = _(module.moduleCache).detect(function(_, name) {return name.match('highlevel_http_client.js')});
    
    hl_http_client.exports.get = helpers.google_geo_request({lat: 1, lng: 1});
    
    assert.response(app, {
      url: '/apartments',
      method: 'POST',
      data: querystring.stringify({'apartment[title]': 'test apartment', 'apartment[street]': 'broadway 5', 'apartment[post_code]': '10999'}),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      {status: 201},
      function(res) {
        assert.eql(JSON.parse(res.body), {type: 'apartment', title: 'test apartment', street: 'broadway 5', city: 'Berlin', country: 'Germany', post_code: '10999', lat: 1, lng: 1});
      });
  }
};