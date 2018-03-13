//---------//
// Imports //
//---------//

import normalizeExpectedArgumentTypes from './expected-argument-types'
import normalizeTypeToFunction from './type-to-function'

import {
  flow,
  map_object as map,
  transformProperties_object as transformProperties,
} from '../../../internal'

//
//------//
// Main //
//------//

export default flow([
  map(
    transformProperties({
      expectedServiceArgumentTypes: normalizeExpectedArgumentTypes,
    })
  ),
  normalizeTypeToFunction,
])
