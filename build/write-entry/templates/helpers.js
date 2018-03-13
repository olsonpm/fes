const filenameToDefaultName = filename => {
  let defaultName = ''

  for (let i = 0; i < filename.length; i += 1) {
    let character = filename[i]
    if (character === '-') {
      i += 1
      character = filename[i].toUpperCase()
    }
    defaultName += character
  }

  return defaultName
}

module.exports = { filenameToDefaultName }
