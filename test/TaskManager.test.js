const { expect } = require('chai')
const { TaskManager } = require('../src/TaskManager')

describe('the task manager', () => {
  it('should exist', () => {
    const manager = new TaskManager()

    return expect(manager).not.to.be.undefined
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
