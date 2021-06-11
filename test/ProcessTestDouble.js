class ProcessTestDouble {
  constructor () {
    this._notifyTermination = () => {}
  }

  currentlyRunning (pid) {
    this.isRunning = () => true
    this.pid = () => pid
    return this
  }

  readyToStart () {
    this.isRunning = () => false
    return this
  }

  withPriority (priority) {
    this.priority = () => priority
    return this
  }

  kill () {
    this.wasKilled = () => true
    this._notifyTermination(this)
    return this
  }

  onTermination (callback) {
    this._notifyTermination = callback
  }
}

module.exports = { ProcessTestDouble }
