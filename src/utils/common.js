module.exports.asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
  .catch(next)
}

module.exports.removeEmptyFromObject = obj => {
  Object.keys(obj)
    .forEach(key => obj[key] == null && delete obj[key])
  return obj
}
