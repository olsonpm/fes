import isLadenDefinition from './is-laden'
import map from '../internal/map_object'
import negate from '../internal/negate'

const composedTypeToFunction = map(negate)(isLadenDefinition.typeToFunction)

export default {
  name: 'isEmpty',
  typeToFunction: composedTypeToFunction,
}
