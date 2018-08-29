//---------//
// Imports //
//---------//

import tedent from 'tedent'

import {
  getInvalidFunctionPropMessage,
  getInvalidPropertiesString,
  makeMatchesSchema,
  makeToInvalidTypeMessage,
  maybeApproveExpectedTypes,
} from './helpers'

import {
  discardAll_set as discardAll,
  discardWhen_array,
  discardWhen_object,
  getArrayOfValues,
  getFirstValue_iterable as getFirstValue,
  getSize_object as getSize,
  isEmpty_hasLength as isEmpty,
  isInteger,
  isLaden_hasLength,
  isLaden_hasSize,
  isLaden_object,
  isUndefined,
  join_array,
  join_set,
  map_object as map,
  passThrough,
} from '../../../lib'

//
//------//
// Init //
//------//

const dataDependentProps = [
    'groupToDataDependentProps',
    'typeToDataDependentProps',
  ],
  schema = getSchema(),
  validKeys = Object.keys(schema),
  matchesSchema = makeMatchesSchema(schema),
  toInvalidTypeMessage = makeToInvalidTypeMessage(schema)

//
//------//
// Main //
//------//

const approveDataDependentProps = definition => {
  const maybeInvalidPropError = getInvalidDataDependentPropsError(
    dataDependentProps,
    definition
  )
  if (maybeInvalidPropError) return maybeInvalidPropError
}

//
//------------------//
// Helper Functions //
//------------------//

function getInvalidDataDependentPropsError(dataDependentProps, definition) {
  const { name } = definition

  for (const prop of dataDependentProps) {
    const somethingToDataDependentProps = definition[prop]
    if (!somethingToDataDependentProps) continue

    const invalidProps = discardWhen_object(isObject)(
      somethingToDataDependentProps
    )
    if (isLaden_object(invalidProps)) {
      return new Error(
        tedent(`
          '${name}' has an invalid '${prop}'
          the following properties are not objects
            ${getInvalidPropertiesString(invalidProps)}
        `)
      )
    }

    const maybeErrorMessage = passThrough(somethingToDataDependentProps, [
      map(toInvalidDataDependentPropMessage),
      discardWhen_object(isUndefined),
      getArrayOfValues,
      join_array('\n\n'),
    ])
    if (maybeErrorMessage) {
      return new Error(
        tedent(`
          '${name}' has an invalid '${prop}'

          ${maybeErrorMessage}
        `)
      )
    }
  }
}

function isObject(something) {
  return something && typeof something === 'object'
}

function toInvalidDataDependentPropMessage(dataDependentProp, type) {
  const givenKeys = new Set(Object.keys(dataDependentProp)),
    unexpectedProperties = discardAll(validKeys)(givenKeys)
  if (isLaden_hasSize(unexpectedProperties)) {
    if (unexpectedProperties.size > 1) {
      const unexpectedPropertiesString = join_set(', ')(unexpectedProperties)
      return `'${type}' has the unexpected properties: ${unexpectedPropertiesString}`
    } else {
      const unexpectedProperty = getFirstValue(unexpectedProperties)
      return `'${type}' has an unexpected property '${unexpectedProperty}'`
    }
  }

  const invalidProperties = discardWhen_object(matchesSchema)(dataDependentProp)
  if (isLaden_object(invalidProperties)) {
    const oneOrMoreProperties =
        getSize(invalidProperties) > 1 ? 'some properties' : 'a property',
      invalidTypeMessage = passThrough(invalidProperties, [
        map(toInvalidTypeMessage),
        getArrayOfValues,
        join_array('\n'),
      ])

    return tedent(`
      '${type}' has ${oneOrMoreProperties} with an invalid type
        ${invalidTypeMessage}
    `)
  }

  const { expectedSupportArgumentTypes } = dataDependentProp
  if (expectedSupportArgumentTypes) {
    if (isEmpty(expectedSupportArgumentTypes)) {
      return `'${type}' cannot have an empty 'expectedSupportArgumentTypes'`
    }

    const maybeInvalidExpectedTypes = maybeApproveExpectedTypes(
      dataDependentProp.expectedSupportArgumentTypes
    )
    if (maybeInvalidExpectedTypes) {
      return tedent(`
        '${type}' has the following invalid expectedSupportArgumentTypes
          ${maybeInvalidExpectedTypes}
      `)
    }
  }

  const { transformSupportArguments } = dataDependentProp
  if (transformSupportArguments) {
    if (isEmpty(transformSupportArguments)) {
      return `'${type}' cannot have an empty 'transformSupportArguments'`
    }

    const invalidKeys = passThrough(transformSupportArguments, [
      Object.keys,
      discardWhen_array(isInteger),
    ])
    if (isLaden_hasLength(invalidKeys)) {
      return tedent(`
        '${type}' has transformSupportArguments with keys other than integers.
        This object or array is supposed to represent transforms for each
        support argument, where the index corresponds to the argument index.
        Keys other than integers just doesn't make sense in this case.
      `)
    }

    const maybeInvalidFunctionPropsMessage = getInvalidFunctionPropMessage(
      ['transformSupportArguments'],
      dataDependentProp
    )
    if (maybeInvalidFunctionPropsMessage) {
      return tedent(`
        '${type}' is invalid
        ${maybeInvalidFunctionPropsMessage}
      `)
    }
  }
}

function getSchema() {
  return {
    approveAllArguments: 'function',
    approveDataArgument: 'function',
    approveSupportArguments: 'function',
    expectedSupportArgumentTypes: 'array',
    theFunction: 'function',
    transformResult: 'function',
    transformSupportArguments: new Set(['array', 'object']),
  }
}

//
//---------//
// Exports //
//---------//

export default approveDataDependentProps
