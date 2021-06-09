const { expect } = require('chai')
const { ProcessTestDouble } = require('./ProcessTestDouble')
const { SortByPriority } = require('../src/SortByPriority')

describe('SortByPriority', () => {
  it('should exist', () => {
    return expect(SortByPriority).not.to.be.undefined
  })
  it('should be compatible with the Array.sort API', () => {
    return expect([].sort(SortByPriority)).not.to.be.undefined
  })
  it('should sort an array of a single process', () => {
    const process = new ProcessTestDouble().currentlyRunning(1)

    return expect([process].sort(SortByPriority)[0].pid()).to.be.equal(1)
  })
  it('should sort an array of processes with different priorities', () => {
    const higherPriority = new ProcessTestDouble().withPriority(1)
    const lowerPriority = new ProcessTestDouble().withPriority(0)

    const sortedArray = [higherPriority, lowerPriority].sort(SortByPriority)

    return expect(sortedArray[0].priority()).to.be.equal(0)
  })
})
