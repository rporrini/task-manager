function PluckPropertyFrom (property, processes) {
  return processes.map(p => ({ [property]: p[property]() }))
}
module.exports = { PluckPropertyFrom }
