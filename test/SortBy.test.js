const { expect } = require('chai')
const { ProcessTestDouble } = require('./ProcessTestDouble')
const { SortBy } = require('../src/SortBy')

describe('SortBy.priority', () => {
  it('should exist', () => {
    return expect(SortBy.priority).not.to.be.undefined
  })
  it('should be compatible with the Array.sort API', () => {
    return expect([].sort(SortBy.priority)).not.to.be.undefined
  })
  it('should sort an array of a single process', () => {
    const process = new ProcessTestDouble().currentlyRunning(1)

    return expect([process].sort(SortBy.priority)[0].pid()).to.be.equal(1)
  })
  it('should sort an array of processes with different priorities', () => {
    const higherPriority = new ProcessTestDouble().withPriority(1)
    const lowerPriority = new ProcessTestDouble().withPriority(0)

    const sortedArray = [higherPriority, lowerPriority].sort(SortBy.priority)

    return expect(sortedArray[0].priority()).to.be.equal(0)
  })
})

describe('SortBy.pid', () => {
  it('should exist', () => {
    return expect(SortBy.pid).not.to.be.undefined
  })
  it('should be compatible with the Array.sort API', () => {
    return expect([].sort(SortBy.pid)).not.to.be.undefined
  })
  it('should sort an array of a single process', () => {
    const process = new ProcessTestDouble().currentlyRunning(1)

    return expect([process].sort(SortBy.pid)[0].pid()).to.be.equal(1)
  })
  it('should sort an array of processes with different PID', () => {
    const higherPID = new ProcessTestDouble().currentlyRunning(10)
    const lowerPID = new ProcessTestDouble().currentlyRunning(5)

    const sortedArray = [higherPID, lowerPID].sort(SortBy.pid)

    return expect(sortedArray[0].pid()).to.be.equal(5)
  })
})
