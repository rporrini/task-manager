const alwaysAccept = () => (processes, process) => {
  processes.push(process)
}

const fixedCapacity = (capacity = 0) => (processes, process) => {
  if (capacity === processes.length) throw new Error('Process capacity was exceeded')
  processes.push(process)
}

exports.TracingStrategy = {
  alwaysAccept,
  fixedCapacity
}
