//---------//
// Imports //
//---------//

import normalizeExpectedArgumentTypes from './expected-argument-types'

import {
  assignOver_object as applyDefaults,
  identity,
  noop,
  passThrough,
  transformProperties_array,
  transformProperties_object,
} from '../../lib'

//
//------//
// Main //
//------//

const normalizeHasNoDataArgument = props =>
  passThrough(props, [
    transformProperties_object({
      transformArguments: transformProperties_array,
    }),
    applyDefaults({
      approveArguments: noop,
      shouldThrowOnExtraArguments: true,
      transformResult: identity,
      transformArguments: identity,
    }),
    transformProperties_object({
      expectedArgumentTypes: normalizeExpectedArgumentTypes,
    }),
  ])

//
//---------//
// Exports //
//---------//

export default normalizeHasNoDataArgument
