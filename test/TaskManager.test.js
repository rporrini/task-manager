const { expect } = require('chai')
const { SortBy } = require('../src/SortBy')
const { TaskManager } = require('../src/TaskManager')
const { ProcessTestDouble } = require('./ProcessTestDouble')

const pluckPropertyFrom = (property, processes) => processes.map(p => ({ [property]: p[property]() }))

describe('the task manager', () => {
  it('should exist', () => {
    const manager = new TaskManager()

    return expect(manager).not.to.be.undefined
  })
  it('should track a process', () => {
    const manager = new TaskManager().add(new ProcessTestDouble().currentlyRunning())

    return expect(manager.list()).not.to.be.empty
  })
  it('should track running processes only', () => {
    const yetToStartedProcess = new ProcessTestDouble().readyToStart()

    const manager = new TaskManager().add(yetToStartedProcess)

    return expect(manager.list()).to.be.empty
  })
  it('should expose a list of processes', () => {
    const manager = new TaskManager()

    return expect(manager.list()).not.to.be.undefined
  })
  it('should expose an empty running processes list by default', () => {
    const manager = new TaskManager()

    return expect(manager.list()).to.be.eql([])
  })
  it('should allow to sort the list by a specified criteria', () => {
    const higherPriority = new ProcessTestDouble().currentlyRunning().withPriority(1)
    const lowerPriority = new ProcessTestDouble().currentlyRunning().withPriority(0)

    const processes = pluckPropertyFrom('priority', new TaskManager()
      .add(higherPriority)
      .add(lowerPriority)
      .list(SortBy.priority))

    return expect(processes).to.be.eql([{ priority: 0 }, { priority: 1 }])
  })
  it('should not modify the order of the list of process when performing a sort operation', () => {
    const first = new ProcessTestDouble().currentlyRunning(10).withPriority(1)
    const second = new ProcessTestDouble().currentlyRunning(20).withPriority(0)

    const manager = new TaskManager().add(first).add(second)
    manager.list(SortBy.priority)

    const processes = pluckPropertyFrom('pid', manager.list())

    return expect(processes).to.be.eql([{ pid: 10 }, { pid: 20 }])
  })
})
