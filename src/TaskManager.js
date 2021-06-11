const { Select } = require('./Select')

class TaskManager {
  constructor (tracingStrategy) {
    this._processes = []
    this._processesTracingStrategy = tracingStrategy
  }

  add (process) {
    this._processesTracingStrategy(this._processes, process)
    process.onTermination(terminatedProcess => {
      const indexToDelete = this._processes.findIndex(p => p.pid() === terminatedProcess.pid())
      if (indexToDelete > -1) this._processes.splice(indexToDelete, 1)
    })
    return this
  }

  list (sortCriterion) {
    return this._processes.filter(Select.all).sort(sortCriterion)
  }

  kill (selectionCriterion) {
    return this._processes.filter(selectionCriterion).map(process => process.kill())
  }
}
module.exports = { TaskManager }
