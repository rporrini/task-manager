const alwaysAccept = () => (processes, process) => {
  processes.push(process)
}

const fixedCapacity = (capacity = 0) => (processes, process) => {
  if (capacity === processes.length) throw new Error('Process capacity was exceeded')
  processes.push(process)
}

const fifo = (capacity = 0) => (processes, process) => {
  if (capacity === 0) return
  if (capacity === processes.length) {
    processes.shift().kill()
  }
  processes.push(process)
}

exports.TracingStrategy = {
  alwaysAccept,
  fixedCapacity,
  fifo
}
