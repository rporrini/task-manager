const { expect } = require('chai')
const { TracingStrategy } = require('../src/TracingStrategy')
const { ProcessTestDouble } = require('./ProcessTestDouble')

const pluckPropertyFrom = (property, processes) => processes.map(p => ({ [property]: p[property]() }))

describe('TracingStrategy.fixedCapacity', () => {
  it('should not accept processes by default', () => {
    const processes = []

    TracingStrategy.fixedCapacity()(processes, {})

    return expect(processes).to.be.empty
  })

  it('should add a process to the list', () => {
    const processes = []

    TracingStrategy.fixedCapacity(1)(processes, {})

    return expect(processes).not.to.be.empty
  })

  it('should not add a process to the list when reaching capacity', () => {
    const processes = []
    const strategy = TracingStrategy.fixedCapacity(1)

    strategy(processes, {})
    strategy(processes, {})

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

describe('TracingStrategy.priorityBased', () => {
  it('should not accept new processes by default', () => {
    const processes = []

    TracingStrategy.priorityBased()(processes, {})

    return expect(processes).to.be.empty
  })

  it('should accept new processes when maximum capacity is not reached', () => {
    const processes = []

    TracingStrategy.priorityBased(1)(processes, {})

    return expect(processes).not.to.be.empty
  })
  it('should remove from the processes list the oldest process with lower priority', () => {
    const processes = []
    const strategy = TracingStrategy.priorityBased(2)

    strategy(processes, new ProcessTestDouble().currentlyRunning(123).withPriority(2))
    strategy(processes, new ProcessTestDouble().currentlyRunning(456).withPriority(1))
    strategy(processes, new ProcessTestDouble().currentlyRunning(789).withPriority(2))

    expect(pluckPropertyFrom('pid', processes)).to.be.eql([{ pid: 123 }, { pid: 789 }])
  })

  it('should not remove from the processes list a process with the same priority', () => {
    const processes = []
    const strategy = TracingStrategy.priorityBased(2)

    strategy(processes, new ProcessTestDouble().currentlyRunning(123).withPriority(2))
    strategy(processes, new ProcessTestDouble().currentlyRunning(456).withPriority(1))
    strategy(processes, new ProcessTestDouble().currentlyRunning(789).withPriority(1))

    expect(pluckPropertyFrom('pid', processes)).to.be.eql([{ pid: 123 }, { pid: 456 }])
  })

  it('should remove from the processes list process with lowest priority', () => {
    const processes = []
    const strategy = TracingStrategy.priorityBased(3)

    strategy(processes, new ProcessTestDouble().currentlyRunning(123).withPriority(2))
    strategy(processes, new ProcessTestDouble().currentlyRunning(456).withPriority(1))
    strategy(processes, new ProcessTestDouble().currentlyRunning(789).withPriority(1))
    strategy(processes, new ProcessTestDouble().currentlyRunning(999).withPriority(3))

    expect(pluckPropertyFrom('pid', processes)).to.be.eql([{ pid: 123 }, { pid: 789 }, { pid: 999 }])
  })

  it('should not add a process lower priority processes', () => {
    const processes = []
    const strategy = TracingStrategy.priorityBased(1)

    strategy(processes, new ProcessTestDouble().currentlyRunning(123).withPriority(2))
    strategy(processes, new ProcessTestDouble().currentlyRunning(456).withPriority(1))

    expect(pluckPropertyFrom('pid', processes)).to.be.eql([{ pid: 123 }])
  })
})
