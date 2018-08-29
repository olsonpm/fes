//---------//
// Imports //
//---------//

import approve from './approve'
import arrayOfData from './array-of-data'
import noData from './no-data'
import normalizeDefinition from './normalize/definition'
import supportedData from './supported-data'
import justData from './just-data'

import { getUtilityType } from './helpers'

import { clone_object as clone } from '../lib'

//
//------//
// Init //
//------//

const utilityTypeToCreate = getUtilityTypeToCreate()

//
//------//
// Main //
//------//

const createUtility = definition => {
  const maybeError = approve.definition(definition)
  if (maybeError) throw maybeError

  definition = normalizeDefinition(clone(definition))

  const type = getUtilityType(definition),
    create = utilityTypeToCreate[type]

  return create(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

function getUtilityTypeToCreate() {
  return {
    'array-of-data': arrayOfData,
    'just-data': justData,
    'no-data': noData,
    'supported-data': supportedData,
  }
}

//
//---------//
// Exports //
//---------//

export default createUtility
