const { expect } = require('chai')
const { TaskManager } = require('../src/TaskManager')
const { Process } = require('../src/Process')

describe('the task manager', () => {
  it('should exist', () => {
    const manager = new TaskManager()

    return expect(manager).not.to.be.undefined
  })
  it('should track a process', () => {
    const manager = new TaskManager().add(new Process('echo').start())

    return expect(manager.list()).not.to.be.empty
  })
  it('should track running processes only', () => {
    const yetToStartedProcess = new Process()

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
})
