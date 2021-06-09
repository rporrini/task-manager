const SortBy = (field) => (first, second) => first[field]() - second[field]()

exports.SortBy = {
  pid: SortBy('pid'),
  priority: SortBy('priority')
}
