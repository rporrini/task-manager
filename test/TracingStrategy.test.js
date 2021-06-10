const { expect } = require('chai')
const { TracingStrategy } = require('../src/TracingStrategy')

describe('TracingStrategy.fixedCapacity', () => {
  it('should not accept processes by default', () => {
    const strategy = TracingStrategy.fixedCapacity()

    return expect(() => strategy([], {})).to.throw()
  })

  it('should accept processes if there is enough capacity', () => {
    const strategy = TracingStrategy.fixedCapacity(1)

    return expect(() => strategy([], {})).not.to.throw()
  })

  it('should add a process to the list', () => {
    const processes = []

    TracingStrategy.fixedCapacity(1)(processes, {})

    return expect(processes).not.to.be.empty
  })

  it('should not add a process to the list when reaching capacity', () => {
    const processes = []
    const strategy = TracingStrategy.fixedCapacity(1)

    const addingTwoProcesses = () => {
      strategy(processes, {})
      strategy(processes, {})
    }

    expect(addingTwoProcesses).to.throw()
    expect(processes).to.have.length(1)
  })
})
