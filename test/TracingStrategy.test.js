const { expect } = require('chai')
const { TracingStrategy } = require('../src/TracingStrategy')
const { ProcessTestDouble } = require('./ProcessTestDouble')

const pluckPropertyFrom = (property, processes) => processes.map(p => ({ [property]: p[property]() }))

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

describe('TracingStrategy.fifo', () => {
  it('should not accept new processes by default', () => {
    const processes = []

    TracingStrategy.fifo()(processes, {})

    return expect(processes).to.be.empty
  })

  it('should accept new processes when maximum capacity is not reached', () => {
    const processes = []

    TracingStrategy.fifo(1)(processes, {})

    return expect(processes).not.to.be.empty
  })

  it('should remove the oldest process when capacity is reached', () => {
    const processes = []
    const strategy = TracingStrategy.fifo(2)

    strategy(processes, new ProcessTestDouble().currentlyRunning(123))
    strategy(processes, new ProcessTestDouble().currentlyRunning(456))
    strategy(processes, new ProcessTestDouble().currentlyRunning(789))

    expect(pluckPropertyFrom('pid', processes)).to.be.eql([{ pid: 456 }, { pid: 789 }])
  })

  it('should kill the oldest process when capacity is reached', () => {
    const processes = []
    const strategy = TracingStrategy.fifo(1)
    const firstIn = new ProcessTestDouble().currentlyRunning(123)

    strategy(processes, firstIn)
    strategy(processes, new ProcessTestDouble().currentlyRunning(456))

    return expect(firstIn.wasKilled()).to.be.true
  })
})
