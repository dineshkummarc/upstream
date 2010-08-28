// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../server'),
  couchdb = app.db,
  sys = require('sys');

module.exports = {
  'GET /apartments with price filters apartments by price': function(assert) {
    var path, query;
    
    couchdb.request = function(_path, _query, callback) {
      path = _path;
      query = _query;
      callback(null, {
        rows: [
          {doc: {_id: 'apartment-1', title: 'my apartment'}}
          ]
      })
    };

    assert.response(app, {
      url: '/apartments?rooms_min=1&rooms_max=3',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        },
      },
      {
        status: 200
      },
      function(res) {
        assert.equal('/_fti/_design/apartment/by_filters', path);
        assert.eql({q: 'rooms<int>:[1 TO 3]', include_docs: true}, query);
        assert.eql(JSON.parse(res.body), [{_id: 'apartment-1', title: 'my apartment'}]);
      });
  }
};
