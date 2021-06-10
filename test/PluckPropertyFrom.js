function pluckPropertyFrom (property, processes) {
  return processes.map(p => ({ [property]: p[property]() }))
}
exports.PluckPropertyFrom = pluckPropertyFrom
