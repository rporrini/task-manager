const running = p => p.isRunning()
const pid = pid => process => process.pid() === pid
const priority = priority => process => process.priority() === priority
const all = () => true

exports.Select = { running, pid, priority, all }
