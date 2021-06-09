class TaskManager {
  constructor () {
    this._processes = []
  }

  add (process) {
    this._processes.push(process)
    return this
  }

  list () {
    return this._processes.filter(p => p.isRunning())
  }
}
module.exports = { TaskManager }
