export default isAsynchronous => {
  return isAsynchronous
    ? error => Promise.reject(error)
    : error => {
        throw error
      }
}
