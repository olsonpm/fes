//---------//
// Imports //
//---------//

import jstring from '../../internal/jstring'
import findFirstWhen from '../../internal/find-first-when_array-like'
import first from '../../internal/first_array-like'
import flow from '../../internal/flow'
import getValueAt from '../../internal/get-value-at_object'
import passThrough from '../../internal/pass-through'
import truncateToNLines from '../../internal/truncate-to-n-lines'

//
//------//
// Main //
//------//

const findFirstValueWithTruthyKey = flow([findFirstWhen(first), getValueAt(1)])

const formatGivenArgument = ({ anArg, argIdx }) => {
  const argToString = passThrough(anArg, [jstring, truncateToNLines(3)])

  return `Argument ${argIdx} given: ${argToString}`
}

const setIfNotDefined = (obj, key, val) => {
  if (obj[key] === undefined) obj[key] = val
  return obj
}

const throwOrReject = (error, isAsynchronous) => {
  if (isAsynchronous) return Promise.reject(error)
  else throw error
}

const setOfTypedArrays = getSetOfTypedArrays()

//
//------------------//
// Helper Functions //
//------------------//

function getSetOfTypedArrays() {
  return new Set([
    'float32Array',
    'float64Array',
    'int16Array',
    'int32Array',
    'int8Array',
    'uint16Array',
    'uint32Array',
    'uint8Array',
    'uint8ClampedArray',
  ])
}

//
//---------//
// Exports //
//---------//

export {
  findFirstValueWithTruthyKey,
  formatGivenArgument,
  setIfNotDefined,
  setOfTypedArrays,
  throwOrReject,
}
