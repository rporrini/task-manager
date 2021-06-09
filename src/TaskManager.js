const { Select } = require('./Select')

class TaskManager {
  constructor () {
    this._processes = []
  }

  add (process) {
    this._processes.push(process)
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
