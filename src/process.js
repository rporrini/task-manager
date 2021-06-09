const { exec } = require('child_process')

class Process {
  constructor (command) {
    this._command = command
  }

  start () {
    this._process = exec(this._command, {}, (_, printedOutput) => {
      this._stdout = printedOutput
    })
    return this
  }

  withPriority (priority) {
    this._priority = priority
    return this
  }

  priority () {
    return this._priority
  }

  kill () {
    return this._process.kill('SIGKILL')
  }

  pid () {
    return this._process.pid
  }

  stdout () {
    return this._stdout
  }
}

module.exports = { Process }
