//---------//
// Imports //
//---------//

import tedent from 'tedent'

import groupToTypes from '../../normalize/type-properties/group-to-types'

import { getGenericHeader } from './helpers'

import {
  discardAll_set as discardAll,
  getFirstValue_iterable as getFirstValue,
  isLaden_hasSize,
  join_set as join,
} from '../../../lib'

//
//------//
// Init //
//------//

const validGroups = Object.keys(groupToTypes),
  groupProps = getGroupProps()

//
//------//
// Main //
//------//

const approveGroups = definition => {
  const invalidPropMessage = getInvalidGroupsMessage(groupProps, definition)
  if (invalidPropMessage) {
    return new Error(
      tedent(`
        ${getGenericHeader(definition)}
        ${invalidPropMessage}
      `)
    )
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function getInvalidGroupsMessage(groupProps, definition) {
  for (const prop of groupProps) {
    const groupToSomething = definition[prop]
    if (!groupToSomething) continue

    const maybeInvalidGroups = getInvalidGroups(groupToSomething)
    if (maybeInvalidGroups) {
      if (maybeInvalidGroups.size === 1) {
        const invalidGroup = getFirstValue(maybeInvalidGroups)
        return `'${prop}' has one invalid group '${invalidGroup}'`
      } else {
        const invalidGroupsString = join(', ')(maybeInvalidGroups)
        return `'${prop}' has the invalid groups: ${invalidGroupsString}`
      }
    }
  }
}

function getInvalidGroups(groupToSomething) {
  const givenGroups = new Set(Object.keys(groupToSomething)),
    invalidGroups = discardAll(validGroups)(givenGroups)

  return isLaden_hasSize(invalidGroups) ? invalidGroups : undefined
}

function getGroupProps() {
  return ['groupToDataDependentProps', 'groupToFunction']
}

//
//---------//
// Exports //
//---------//

export default approveGroups
