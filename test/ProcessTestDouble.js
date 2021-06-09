class ProcessTestDouble {
  currentlyRunning () {
    this.isRunning = () => true
    return this
  }

  readyToStart () {
    this.isRunning = () => false
    return this
  }
}
exports.ProcessTestDouble = ProcessTestDouble
