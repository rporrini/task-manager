const { exec } = require('child_process')

const subscribeToExit = object => callback => object._process.on('exit', callback)
const signalIsNotRunning = object => () => { object._running = false }
const accumulateOuput = object => (_, printedOutput) => { object._stdout = printedOutput }

class Process {
  constructor (command) {
    this._command = command
    this._running = false
    this._observeTermination = () => {}
  }

  start () {
    this._process = exec(this._command, {}, accumulateOuput(this))
    const subscribe = subscribeToExit(this)
    subscribe(signalIsNotRunning(this))
    subscribe(() => { this._observeTermination(this) })
    this._running = true
    return this
  }

  withPriority (priority) {
    this._priority = priority
    return this
  }

  priority () {
    return this._priority
  }

  kill () {
    return this._process.kill('SIGKILL')
  }

  pid () {
    return this._process.pid
  }

  stdout () {
    return this._stdout
  }

  isRunning () {
    return this._running
  }

  onTermination (callback) {
    this._observeTermination = callback
    return this
  }
}

module.exports = { Process }
