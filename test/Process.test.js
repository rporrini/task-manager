const { expect } = require('chai')
const { Process } = require('../src/Process')

const termination = (fiveMillis = 5) => new Promise((resolve) => {
  setTimeout(resolve, fiveMillis)
})

const halfSecond = 500

describe('a process', () => {
  it('should exist', () => {
    return expect(new Process()).not.to.be.undefined
  })
  it('should have a PID once started', () => {
    const startedProcess = new Process('echo').start()

    return expect(startedProcess.pid()).to.be.greaterThan(0)
  })
  it('should collect an output', async () => {
    const echo = new Process('echo test').start()

    await termination()

    return expect(echo.stdout()).to.contain('test')
  })
  it('should spawn a real command', async () => {
    const echo = new Process('echo print me').start()

    await termination()

    return expect(echo.stdout()).to.contain('print me')
  })
  it('should have a priority', () => {
    const echo = new Process('echo').withPriority('low').start()

    return expect(echo.priority()).to.be.equal('low')
  })
  it('should be killable', async () => {
    const delayedEco = new Process('sleep 0.3 && echo test finished').start()

    delayedEco.kill()

    await termination(halfSecond)

    return expect(delayedEco.stdout()).not.to.contain('test finished')
  })
})
