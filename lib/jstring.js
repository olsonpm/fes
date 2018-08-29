//
// TODO: figure out a prettier way to stringify stuff
//

//---------//
// Imports //
//---------//

import getType from './get-type'

//
//------//
// Main //
//------//

const jstring = something => {
  const replacer = createReplacer()
  return JSON.stringify(something, replacer, 2)
}

//
//------------------//
// Helper Functions //
//------------------//

function noIndentJstring(something) {
  const replacer = createReplacer()
  return JSON.stringify(something, replacer)
}

function createReplacer() {
  //
  // I'm choosing to use 'replacer' because I don't like 'utils.inspect'.
  //   To solve the problem of circular json structures, I'm just keeping track
  //   of all objects added.  I think I actually prefer this because it provides
  //   both a more concise and acurate structure of the data.
  //
  const duplicateObjects = new Map()

  return (key, value) => {
    if (getType(value) === 'set') return printSet(value)
    else if (getType(value) === 'map') return printMap(value)
    else if (value === undefined) return 'undefined'
    else if (typeof value === 'function') return printFunction(value)
    else if (value && typeof value === 'object') {
      if (duplicateObjects.has(value)) {
        return `<duplicate of '${duplicateObjects.get(value)}'>`
      } else {
        duplicateObjects.set(value, key)
        return value
      }
    } else return value
  }
}

function printFunction(value) {
  return value.name ? `<function ${value.name}>` : '<function>'
}

function printMap(aMap) {
  const contents = []

  for (const [key, value] of aMap) {
    contents.push(`${noIndentJstring(key)} => ${noIndentJstring(value)}`)
  }

  return `Map { ${contents.join(', ')} }`
}

function printSet(aSet) {
  const contents = []

  for (const value of aSet) {
    contents.push(noIndentJstring(value))
  }

  return `Set { ${contents.join(', ')} }`
}

//
//---------//
// Exports //
//---------//

export default jstring
