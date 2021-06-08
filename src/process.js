const { exec } = require('child_process')

const attachingStandartOutputTo = output => (_, printedOutput) => {
  output.stdout = () => printedOutput
}

const proxyKillFunctionOf = process => () => process.kill('SIGKILL')
const proxyPidOf = process => () => process.pid

const runnableProcess = (command, priority) => ({

  withPriority: priority => runnableProcess(command, priority),

  start: () => {
    const output = { priority: () => priority }
    const process = exec(command, {}, attachingStandartOutputTo(output))
    output.kill = proxyKillFunctionOf(process)
    output.pid = proxyPidOf(process)
    return output
  }
})

module.exports = { process: runnableProcess }
