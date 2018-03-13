import normalizeExpectedArgumentTypes from './expected-argument-types'
import transformProperties from '../../../internal/transform-properties_object'

const normalizeHasNoDataArgument = props => {
  return transformProperties({
    expectedArgumentTypes: normalizeExpectedArgumentTypes,
  })(props)
}

export default normalizeHasNoDataArgument
