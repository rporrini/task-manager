const { expect } = require('chai')
const { ProcessTestDouble } = require('./ProcessTestDouble')
const { Filter } = require('../src/Filter')

describe('Filter', () => {
  it('should select a running process', () => {
    const process = new ProcessTestDouble().currentlyRunning()
    return expect(Filter.running(process)).to.be.true
  })
  it('should filter a not running process out', () => {
    const process = new ProcessTestDouble().readyToStart()
    return expect(Filter.running(process)).to.be.false
  })
})
