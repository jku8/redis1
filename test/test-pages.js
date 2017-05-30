var expect  = require('chai').expect;
var request = require('request');
var server = require('../index.js');
var gifType = 'GIF89a\u0001\u0000\u0001\u0000�\u0000\u0000���\u0000\u0000\u0000,\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002D\u0001\u0000;';

describe('server response', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});

it('Response type', function(done) {
  request.get('http://localhost:8080/tracking/track.gif' , function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal(gifType);
    done();
  });
});