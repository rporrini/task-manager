const { exec } = require('child_process')

const collect = output => (_, printedOutput) => {
  output.stdout = printedOutput
}

const runnableProcess = command => ({

  command: commandString => runnableProcess(commandString),

  start: () => {
    const output = {}
    const process = exec(command, {}, collect(output))
    output.pid = process.pid
    return output
  }
})

module.exports = { process: runnableProcess }
