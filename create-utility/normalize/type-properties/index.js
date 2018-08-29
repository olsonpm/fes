//---------//
// Imports //
//---------//

import normalizeExpectedArgumentTypes from '../expected-argument-types'
import typeToDataDependentProps from './type-to-data-dependent-props'
import typeToFunction from './type-to-function'

import {
  passThrough,
  transformProperties_object as transformProperties,
} from '../../../lib'

//
//------//
// Init //
//------//

const normalize = {
  typeToDataDependentProps,
  typeToFunction,
}

//
//------//
// Main //
//------//

const normalizeTypeProperties = definition =>
  passThrough(definition, [
    transformProperties({
      expectedSupportArgumentTypes: normalizeExpectedArgumentTypes,
    }),
    normalize.typeToDataDependentProps,
    normalize.typeToFunction,
  ])

//
//---------//
// Exports //
//---------//

export default normalizeTypeProperties
