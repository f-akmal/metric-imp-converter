/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai')
const assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

const convertHandler = new ConvertHandler()

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('Whole number input', function (done) {
      const input = '32L'
      assert.equal(convertHandler.getNum(input), 32)
      done()
    })

    test('Decimal Input', function (done) {
      const input = '2.5L'
      assert.equal(convertHandler.getNum(input), 2.5)
      done()
    })

    test('Fractional Input', function (done) {
      const input = '5/2L'
      assert.equal(convertHandler.getNum(input), 2.5)
      done()
    })

    test('Fractional Input w/ Decimal', function (done) {
      const input = '6.6/2L'
      assert.equal(convertHandler.getNum(input), 3.3)
      done()
    })

    test('Double Fraction', function (done) {
      const input = '6/2/2L'
      assert.equal(convertHandler.getNum(input), 1.5)
      done()
    })

    test('Invalid Input', function (done) {
      const input = '6.2.2L'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done()
    })

    test('No Numerical Input', function (done) {
      const input = 'L'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })

  })

  suite('Function convertHandler.getUnit(input)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
      const strings = ['10gal', '10l', '10mi', '10km', '10lbs', '10kg', '10GAL', '10L', '10MI', '10KM', '10LBS', '10KG']
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(strings[index]), ele)
      })
      done()
    })

    test('Unknown Unit Input', function (done) {
      const input = 'kl'
      assert.equal(convertHandler.getUnit(input), 'invalid unit')
      done();
    })

  })

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i])
      })
      done()
    })

  })

  suite('Function convertHandler.spellOutUnit(unit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      //see above example for 
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      const expect = ['gallons', 'litres', 'miles', 'kilometres', 'pounds', 'kilograms']
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i])
      })
      done()
    })

  })

  suite('Function convertHandler.convert(num, unit)', function () {

    test('Gal to L', function (done) {
      const input = [5, 'gal']
      const expected = 18.9271
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1) //0.1 tolerance
      done()
    })

    test('L to Gal', function (done) {
      const input = [5, 'L']
      const expected = 1.3209
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    })

    test('Mi to Km', function (done) {
      const input = [5, 'mi']
      const expected = 8.0467
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    })

    test('Km to Mi', function (done) {
      const input = [5, 'km']
      const expected = 3.1069
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    })

    test('Lbs to Kg', function (done) {
      const input = [5, 'lbs']
      const expected = 2.2680
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    })

    test('Kg to Lbs', function (done) {
      const input = [5, 'gal']
      const expected = 11.0231
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    })

  })

})