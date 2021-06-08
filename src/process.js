const { exec } = require('child_process')

const runnableProcess = (command = {}, output = {}) => ({

  command: commandString => runnableProcess(commandString),

  start: () => {
    const output = {}
    const c = exec(command, {}, (_, printedOutput) => {
      output.stdout = printedOutput
    })
    output.pid = c.pid
    return runnableProcess(command, output)
  },

  pid: () => output.pid,

  output: () => output.stdout

})

module.exports = { process: runnableProcess }
