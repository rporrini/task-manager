const { expect } = require('chai')
const { ProcessTestDouble } = require('./ProcessTestDouble')
const { Select } = require('../src/Select')

describe('Select.running', () => {
  it('should select a running process', () => {
    const process = new ProcessTestDouble().currentlyRunning()
    return expect(Select.running(process)).to.be.true
  })
  it('should Select a not running process out', () => {
    const process = new ProcessTestDouble().readyToStart()
    return expect(Select.running(process)).to.be.false
  })
})

describe('Select.pid', () => {
  it('should Select a process with a wrong pid out', () => {
    const process = new ProcessTestDouble().currentlyRunning(12)

    const SelectPID = Select.pid(1)

    return expect(SelectPID(process)).to.be.false
  })
  it('should select a process with the right pid', () => {
    const process = new ProcessTestDouble().currentlyRunning(12)

    const SelectPID = Select.pid(12)

    return expect(SelectPID(process)).to.be.true
  })
})

describe('Select.priority', () => {
  it('should Select a process with a wrong priority out', () => {
    const process = new ProcessTestDouble().withPriority(0)

    const SelectPriority = Select.priority(1)

    return expect(SelectPriority(process)).to.be.false
  })
  it('should select a process with the right priority', () => {
    const process = new ProcessTestDouble().withPriority(0)

    const SelectPriority = Select.priority(0)

    return expect(SelectPriority(process)).to.be.true
  })
})

describe('Selec.all', () => {
  it('should always be true', () => {
    return expect(Select.all()).to.be.true
  })
})
