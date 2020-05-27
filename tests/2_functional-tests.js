/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http')
var chai = require('chai')
var assert = chai.assert
var server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function () {

  suite('Routing Tests', function () {

    suite('GET /api/convert => conversion object', function () {

      test('Convert 10L (valid input)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 10)
            assert.equal(res.body.initUnit, 'L')
            assert.approximately(res.body.returnNum, 2.64172, 0.1)
            assert.equal(res.body.returnUnit, 'gal')
            done()
          })
      })

      test('Convert 32g (invalid input unit)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '32g' })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 32)
            assert.equal(res.body.initUnit, 'invalid unit')
            assert.isNull(res.body.returnNum)
            done()
          })
      })

      test('Convert 3/7.2/4kg (double fraction)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '3/7.2/4kg' })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.approximately(res.body.initNum, 0.10417, 0.1)
            assert.equal(res.body.initUnit, 'kg')
            assert.approximately(res.body.returnNum, 0.22966, 0.1)
            assert.equal(res.body.returnUnit, 'lbs')
            done()
          })
      })

      test('Convert 6.2.2L (invalid number)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '6.2.2L' })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 'invalid number')
            assert.equal(res.body.initUnit, 'L')
            assert.isNull(res.body.returnNum)
            assert.equal(res.body.returnUnit, 'gal')
            done()
          })
      })

      test('Convert 6.2.2kilomegagram (invalid number and unit)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '6.2.2kilomegagram' })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 'invalid number')
            assert.equal(res.body.initUnit, 'invalid unit')
            assert.isNull(res.body.returnNum)
            done()
          })
      })

      test('Convert kg (no number)', function (done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: 'kg' })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 1)
            assert.equal(res.body.initUnit, 'kg')
            assert.approximately(res.body.returnNum, 2.20462, 0.1)
            assert.equal(res.body.returnUnit, 'lbs')
            done()
          })
      })

    })

  })

})
