//---------//
// Imports //
//---------//

import keepWhenDefinition from './keep-when'
import mapValues from '../internal/map_object'
import negate from '../internal/negate'

//
//------//
// Main //
//------//

const composedTypeToFunction = negatePredicates(
  keepWhenDefinition.typeToFunction
)

export default {
  name: 'discardWhen',
  expectedServiceArgumentTypes: keepWhenDefinition.expectedServiceArgumentTypes,
  typeToFunction: composedTypeToFunction,
}

//
//------------------//
// Helper Functions //
//------------------//

function negatePredicates(typeToFunction) {
  return mapValues(keepWhen => predicate => keepWhen(negate(predicate)))(
    typeToFunction
  )
}
