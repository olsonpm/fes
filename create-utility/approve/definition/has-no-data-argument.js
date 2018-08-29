//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { recursivelyFind } from '../../helpers'

import {
  getGenericHeader,
  getInvalidFunctionPropMessage,
  makeMatchesSchema,
  makeToInvalidTypeMessage,
  maybeApproveExpectedTypes,
} from './helpers'

import {
  discardAll_set as discardAll,
  discardWhen_object as discardWhen,
  getArrayOfValues,
  getFirstValue_iterable as getFirstValue,
  getSize_object as getSize,
  hasKey_object as hasKey,
  isEmpty_hasLength as isEmpty,
  isLaden_hasSize,
  isLaden_object,
  join_array,
  join_set,
  map_object as map,
  passThrough,
  startsWith,
} from '../../../lib'

//
//------//
// Init //
//------//

const schema = getSchema(),
  validKeys = Object.keys(schema),
  toInvalidTypeMessage = makeToInvalidTypeMessage(schema),
  matchesSchema = makeMatchesSchema(schema)

//
//------//
// Main //
//------//

const approveHasNoDataArgument = definition => {
  const { hasNoDataArgument, name } = definition

  if (hasNoDataArgument) {
    const maybeError = approveHasNoDataArgumentObject(definition, [name])
    if (maybeError) return maybeError
  } else {
    const maybeFoundAt = recursivelyFind(
      hasKey('hasNoDataArgument'),
      definition
    )
    if (maybeFoundAt) {
      return new Error(
        tedent(`
          utilities with a data argument cannot merge or be flipped from utilities
          that declare 'hasNoDataArgument'

          hasNoDataArgument was declared at the utility found here:
          ${maybeFoundAt}
        `)
      )
    }
  }
}

//
//------------------//
// Helper Functions //
//------------------//

//
// TODO: figure out a better name for this function
//
function approveHasNoDataArgumentObject(definition, chain) {
  const { hasNoDataArgument } = definition

  if (getSize(definition) > 2) {
    return new Error(
      tedent(`
        ${getGenericHeader(definition)}
        because this utility declares 'hasNoDataArgument', it is not allowed to
        declare properties other than 'name'.
      `)
    )
  }

  const invalidPropMessage = getInvalidHasNoDataPropsMessage(definition)
  if (invalidPropMessage) {
    return new Error(
      tedent(`
        ${getGenericHeader(definition)}
        ${invalidPropMessage}
      `)
    )
  }

  const { mergeDefinitionWith } = hasNoDataArgument
  if (mergeDefinitionWith) {
    const maybeInvalidMergeError = getInvalidMergeError(
      mergeDefinitionWith,
      chain
    )
    if (maybeInvalidMergeError) return maybeInvalidMergeError
  }
}

function getInvalidMergeError(mergeDefinitionWith, chain) {
  const { hasNoDataArgument, name } = mergeDefinitionWith
  if (!name) {
    return new Error(
      tedent(`
        the utility you're merging with doesn't have a name.  All utilities must
        have a name.
      `)
    )
  }
  if (!hasNoDataArgument) {
    return new Error(
      tedent(`
        a utility that 'hasNoDataArgument' can only merge with other utilities
        with no data argument.  Otherwise you'd end up with a utility that doesn't
        know whether it has a data argument!
      `)
    )
  }
  chain.push(name)

  const maybeError = approveHasNoDataArgumentObject(mergeDefinitionWith, chain)
  //
  // TODO: find a better way to organize this code.  This 'if' statement feels
  //   unnecessary and hacky
  //
  if (maybeError && !startsWith('found at')(maybeError.message)) {
    const chainString = chain.join(' -> ')
    maybeError.message = `found at: ${chainString}\n\n${maybeError.message}`
  }
  chain.pop()
  if (maybeError) return maybeError
}

function getInvalidHasNoDataPropsMessage(definition) {
  const { hasNoDataArgument, name } = definition,
    givenKeys = new Set(Object.keys(hasNoDataArgument)),
    unexpectedProperties = discardAll(validKeys)(givenKeys)

  if (isLaden_hasSize(unexpectedProperties)) {
    if (unexpectedProperties.size > 1) {
      const unexpectedPropertiesString = join_set(', ')(unexpectedProperties)
      return tedent(`
        the definition for '${name}' has some unexpected properties

        ${unexpectedPropertiesString}
      `)
    } else {
      // size === 1
      const unexpectedProperty = getFirstValue(unexpectedProperties)
      return `'hasNoDataArgument' has the unexpected property '${unexpectedProperty}'`
    }
  }

  const invalidProperties = discardWhen(matchesSchema)(hasNoDataArgument)
  if (isLaden_object(invalidProperties)) {
    const invalidTypeMessage = passThrough(invalidProperties, [
        map(toInvalidTypeMessage),
        getArrayOfValues,
        join_array('\n'),
      ]),
      oneOrMoreProperties =
        getSize(invalidProperties) > 1 ? 'some properties' : 'a property'

    return tedent(`
      'hasNoDataArgument' has ${oneOrMoreProperties} with an invalid type
        ${invalidTypeMessage}
    `)
  }

  const { expectedArgumentTypes } = hasNoDataArgument
  if (expectedArgumentTypes) {
    if (isEmpty(expectedArgumentTypes)) {
      return `'hasNoDataArgument' cannot have an empty 'expectedSupportArgumentTypes'`
    }

    const maybeInvalidExpectedTypes = maybeApproveExpectedTypes(
      expectedArgumentTypes
    )
    if (maybeInvalidExpectedTypes) {
      return tedent(`
        expectedArgumentTypes has the following invalid values
          ${maybeInvalidExpectedTypes}
      `)
    }
  }

  const { transformArguments } = hasNoDataArgument
  if (transformArguments) {
    if (isEmpty(transformArguments)) {
      return `'hasNoDataArgument' cannot have an empty 'transformArguments'`
    }

    const maybeInvalidFunctionPropsMessage = getInvalidFunctionPropMessage(
      ['transformArguments'],
      hasNoDataArgument
    )
    if (maybeInvalidFunctionPropsMessage)
      return maybeInvalidFunctionPropsMessage
  }
}

function getSchema() {
  return {
    approveArguments: 'function',
    expectedArgumentTypes: 'array',
    isAsynchronous: 'boolean',
    mergeDefinitionWith: 'object',
    shouldThrowOnExtraArguments: 'boolean',
    theFunction: 'function',
    transformArguments: new Set(['array', 'object']),
    transformResult: 'function',
  }
}

//
//---------//
// Exports //
//---------//

export default approveHasNoDataArgument
