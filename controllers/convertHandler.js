/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getNum = function (input) {
    const pattern = /(?<value>[0-9\.\/]*)(?<unit>[A-z]*)/
    const value = input.match(pattern).groups.value

    if (value === '') return 1

    if ((value.match(/\./g) || []).length > 1) return 'invalid number'

    const result = value.split('/').map(parseFloat).reduce((x, y) => x / y)

    if (isNaN(result)) return 'invalid number'

    return result
  }

  this.getUnit = function (input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
    const pattern = /(?<value>[0-9\.\/]*)(?<unit>[A-z]*)/
    const result = input.match(pattern).groups.unit
    return units.includes(result) ? result : 'invalid unit'
  }

  this.getReturnUnit = function (initUnit) {
    const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
    const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']
    const map = input.map((i, index) => ({ [i]: expect[index] }))
      .reduce((obj, x) => Object.assign(obj, { ...x }))
    return map[initUnit.toLowerCase()]
  }

  this.spellOutUnit = function (unit) {
    const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
    const expect = ['gallons', 'litres', 'miles', 'kilometres', 'pounds', 'kilograms']
    const map = input.map((i, index) => ({ [i]: expect[index] }))
      .reduce((obj, x) => Object.assign(obj, { ...x }))
    return map[unit.toLowerCase()]
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    const map = {
      'gal': galToL,
      'l': 1/galToL,
      'mi': miToKm,
      'km': 1/miToKm,
      'lbs': lbsToKg,
      'kg': 1/lbsToKg
    }
    const result = initNum * map[initUnit.toLowerCase()]
    return parseFloat(result.toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initUnit==='invalid unit') return {'error': 'invalid unit'}
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }

}

module.exports = ConvertHandler
