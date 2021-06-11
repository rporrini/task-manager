const { Process } = require('./Process')
const { Select } = require('./Select')
const { TaskManager } = require('./TaskManager')
const { TracingStrategy } = require('./TracingStrategy')

const termination = (fiveMillis = 5) => new Promise((resolve) => {
  setTimeout(resolve, fiveMillis)
})

const pretty = processes => processes.map(p => ({ command: p._command, pid: p.pid(), priority: p.priority() }))

const run = async () => {
  console.log('--- DEMO')

  const taskManager = new TaskManager(TracingStrategy.priorityBased(3))

  const rawProcesses = [
    { command: 'process 1 is running && sleep 1', priority: 0 },
    { command: 'process 2 is running && sleep 1', priority: 1 },
    { command: 'long running process 3 is running && sleep 5 && echo and finished', priority: 2 },
    { command: 'process 4 is running && sleep 1', priority: 1 }
  ]
  const processes = rawProcesses.map(process => new Process(`echo ${process.command}`).withPriority(process.priority).start())
  processes.map(process => taskManager.add(process))

  console.log('--- Processes to run:')
  console.log(rawProcesses)

  console.log('--- Running Processes. Do not include the process with lower priority due to Priority-based, fixed-capacity policy:')
  console.log(pretty(taskManager.list()))

  taskManager.kill(Select.pid(processes[2].pid()))
  await termination(500)
  console.log('--- Killed long running process. Remaining processes are:')
  console.log(pretty(taskManager.list()))

  await termination(1000)
  console.log('--- Task Manager is empty since all the processes finished or were killed:')
  console.log(pretty(taskManager.list()))

  console.log('--- Ouput of the processes:')
  console.log(processes.map(p => p.stdout()))
}

run()
