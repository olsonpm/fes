//---------//
// Imports //
//---------//

import normalizeExpectedArgumentTypes from '../expected-argument-types'
import groupToTypes from './group-to-types'

import {
  assignOver_object as assignOver,
  hasKey_object as hasKey,
  keepWhen_object as keepWhen,
  map_object as map,
  mMap_object as mMap,
  noop,
  passThrough,
  pickAll_object as pickAll,
  reduce_object as reduce,
  transformProperties_object,
  transformProperties_array,
} from '../../../lib'

//
//------//
// Init //
//------//

const applyDefaults = assignOver

//
//------//
// Main //
//------//

const maybeNormalizeTypeToDataDependentProps = definition => {
  const { groupToDataDependentProps, typeToDataDependentProps } = definition

  if (!(typeToDataDependentProps || groupToDataDependentProps))
    return definition

  return passThrough(definition, [
    maybeMixGroupIntoTypes,
    initDefaults,
    normalizeSupportArgTypes,
    initializeSupportArgTransforms,
    copyTopLevelProps,
  ])
}

//
//------------------//
// Helper Functions //
//------------------//

function initializeSupportArgTransforms(definition) {
  passThrough(definition.typeToDataDependentProps, [
    keepWhen(hasKey('transformSupportArguments')),
    mMap(dataDependentProp => {
      const { transformSupportArguments } = dataDependentProp

      dataDependentProp.transformSupportArguments = transformProperties_array(
        transformSupportArguments
      )

      return dataDependentProp
    }),
  ])

  return definition
}

function normalizeSupportArgTypes(definition) {
  mMap(
    transformProperties_object({
      expectedSupportArgumentTypes: normalizeExpectedArgumentTypes,
    })
  )(definition.typeToDataDependentProps)

  return definition
}

function initDefaults(definition) {
  return transformProperties_object({
    typeToDataDependentProps: map(
      applyDefaults({
        approveAllArguments: noop,
        approveDataArgument: noop,
      })
    ),
  })(definition)
}

function copyTopLevelProps(definition) {
  const { typeToDataDependentProps } = definition,
    possibleDataDependentProps = [
      'approveSupportArguments',
      'expectedSupportArgumentTypes',
      'transformResult',
      'transformSupportArguments',
    ],
    pickPropsFrom = pickAll(possibleDataDependentProps)

  const topLevel = pickPropsFrom(definition)

  mMap(assignOver(topLevel))(typeToDataDependentProps)

  return definition
}

function maybeMixGroupIntoTypes(definition) {
  const {
    typeToDataDependentProps: typeTo,
    groupToDataDependentProps: groupTo,
  } = definition

  definition.typeToDataDependentProps = groupTo
    ? reduce(mixGroupIntoTypes, typeTo)(groupTo)
    : typeTo

  return definition
}

function mixGroupIntoTypes(...args) {
  const [typeToDataDependentProps, dataDependentProps, group] = args,
    types = groupToTypes[group]

  return types.reduce((result, aType) => {
    result[aType] = mix(dataDependentProps)(result[aType])

    return result
  }, typeToDataDependentProps)
}

function mix(dataDependentPropsFromGroup) {
  const fromGroup = dataDependentPropsFromGroup

  return dataDependentPropsFromType => {
    const fromType = dataDependentPropsFromType
    return assignOver(fromGroup)(fromType)
  }
}

//
//---------//
// Exports //
//---------//

export default maybeNormalizeTypeToDataDependentProps
