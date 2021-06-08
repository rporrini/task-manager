const { exec } = require('child_process')

const collect = output => (_, printedOutput) => {
  output.stdout = printedOutput
}

const runnableProcess = (command, priority) => ({

  withPriority: priority => runnableProcess(command, priority),

  start: () => {
    const output = {}
    const process = exec(command, {}, collect(output))
    output.kill = () => process.kill('SIGKILL')
    output.pid = process.pid
    output.priority = priority
    return output
  }
})

module.exports = { process: runnableProcess }
