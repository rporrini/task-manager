const alwaysAccept = () => (processes, process) => {
  processes.push(process)
}

const fixedCapacity = (capacity = 0) => (processes, process) => {
  if (capacity === 0) return
  if (capacity === processes.length) return
  processes.push(process)
}

const fifo = (capacity = 0) => (processes, process) => {
  if (capacity === 0) return
  if (capacity === processes.length) {
    processes.shift().kill()
  }
  processes.push(process)
}

const priorityBased = (capacity = 0) => (processes, process) => {
  if (capacity === 0) return
  if (capacity === processes.length) {
    let indexToDelete = -1
    let lowestPrioritySoFar = Infinity
    for (let i = 0; i < processes.length; i++) {
      const candidatePriority = processes[i].priority()
      if (candidatePriority < process.priority() && candidatePriority < lowestPrioritySoFar) {
        indexToDelete = i
        lowestPrioritySoFar = candidatePriority
      }
    }
    if (indexToDelete > -1) processes.splice(indexToDelete, 1)
    else return
  }
  processes.push(process)
}

exports.TracingStrategy = {
  alwaysAccept,
  fixedCapacity,
  fifo,
  priorityBased
}
