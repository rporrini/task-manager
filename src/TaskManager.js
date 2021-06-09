const { Filter } = require('./Filter')

class TaskManager {
  constructor () {
    this._processes = []
  }

  add (process) {
    this._processes.push(process)
    return this
  }

  list (sortCriteria) {
    return this._processes.filter(Filter.running).sort(sortCriteria)
  }
}
module.exports = { TaskManager }
