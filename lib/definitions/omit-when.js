import pickWhenDefinition from './pick-when'
import mapValues from '../internal/map_object'
import negate from '../internal/negate'

const composedTypeToFunction = negatePredicates(
  pickWhenDefinition.typeToFunction
)

export default {
  name: 'omitWhen',
  expectedServiceArgumentTypes: pickWhenDefinition.expectedServiceArgumentTypes,
  typeToFunction: composedTypeToFunction,
}

//
//------------------//
// Helper Functions //
//------------------//

function negatePredicates(typeToFunction) {
  return mapValues(pickWhen => predicate => pickWhen(negate(predicate)))(
    typeToFunction
  )
}
