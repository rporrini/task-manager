const alwaysAccept = () => (processes, process) => {
  processes.push(process)
}

const fixedCapacity = (capacity = 0) => (processes, process) => {
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
    const doNotDeleteAnything = { priority: Infinity, index: -1 }
    const toDelete = processes.reduce((toDelete, currentProcess, index) => {
      if (currentProcess.priority() < process.priority() && currentProcess.priority() < toDelete.priority) {
        return {
          priority: currentProcess.priority(),
          index
        }
      }
      return toDelete
    }, doNotDeleteAnything)
    if (toDelete.index === doNotDeleteAnything.index) return
    else processes.splice(toDelete.index, 1)
  }
  processes.push(process)
}

exports.TracingStrategy = {
  alwaysAccept,
  fixedCapacity,
  fifo,
  priorityBased
}
