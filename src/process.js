const { exec } = require('child_process')

const toFunction = value => () => value

const attachingStandartOutputTo = output => (_, printedOutput) => {
  output.stdout = toFunction(printedOutput)
}
const proxyKillFunctionOf = process => () => process.kill('SIGKILL')
const proxyPidOf = process => toFunction(process.pid)

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
