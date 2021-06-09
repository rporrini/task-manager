class ProcessTestDouble {
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
}
exports.ProcessTestDouble = ProcessTestDouble
