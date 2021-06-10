const { Select } = require('./Select')

class TaskManager {
  constructor (tracingStrategy) {
    this._processes = []
    this._processesTracingStrategy = tracingStrategy
  }

  add (process) {
    this._processesTracingStrategy(this._processes, process)
    return this
  }

  list (sortCriterion) {
    return this._processes.filter(Select.running).sort(sortCriterion)
  }

  kill (selectionCriterion) {
    return this._processes.filter(selectionCriterion).map(process => process.kill())
  }
}
module.exports = { TaskManager }
