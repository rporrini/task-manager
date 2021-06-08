const { expect } = require('chai')
const { process } = require('../src/process')

const termination = (fiveMillis = 5) => new Promise((resolve) => {
  setTimeout(resolve, fiveMillis)
})

describe('a process', () => {
  it('should exist', () => {
    return expect(process).not.to.be.undefined
  })
  it('has no PID by default', () => {
    const pid = process().pid

    return expect(pid).to.be.undefined
  })
  it('has a PID once started', () => {
    const startedProcess = process('echo').start()

    return expect(startedProcess.pid).to.be.greaterThan(0)
  })
  it('should collect an output', async () => {
    const echo = process('echo test').start()

    await termination()

    return expect(echo.stdout).to.be.contains('test')
  })
  it('should spawn a real command', async () => {
    const echo = process('echo print me').start()

    await termination()

    return expect(echo.stdout).to.be.contains('print me')
  })
  it('should have a priority', () => {
    const p = process('echo').withPriority('low').start()

    return expect(p.priority).to.be.equal('low')
  })
})
