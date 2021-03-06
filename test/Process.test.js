const { expect } = require('chai')
const { Process } = require('../src/Process')

const termination = (fiveMillis = 5) => new Promise((resolve) => {
  setTimeout(resolve, fiveMillis)
})

const halfSecond = 500

describe('Process', () => {
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
  it('should not be running once created', () => {
    return expect(new Process().isRunning()).to.be.false
  })
  it('should be running once started', () => {
    const runningProcess = new Process('echo').start()

    return expect(runningProcess.isRunning()).to.be.true
  })
  it('shuold not be running once terminated', async () => {
    const runningProcess = new Process('echo').start()

    await termination()

    return expect(runningProcess.isRunning()).to.be.false
  })

  it('shuold not be running once killed', async () => {
    const runningProcess = new Process('sleep 1').start()
    runningProcess.kill()

    await termination(halfSecond)

    return expect(runningProcess.isRunning()).to.be.false
  })

  it('should provide an API to observe the process end event', async () => {
    let wasCalled = false

    new Process('echo').onTermination(() => { wasCalled = true }).start()
    await termination()

    return expect(wasCalled).to.be.true
  })

  it('should notify itself to the observer on termination', async () => {
    const echo = new Process('echo')
    let notified = {}

    const expectedPid = echo.onTermination(process => { notified = process }).start().pid()
    await termination()

    return expect(notified.pid()).to.be.eq(expectedPid)
  })
  it('should allow observing after is started', async () => {
    let wasCalled = false

    new Process('echo').start().onTermination(() => { wasCalled = true })
    await termination()

    return expect(wasCalled).to.be.true
  })
})
