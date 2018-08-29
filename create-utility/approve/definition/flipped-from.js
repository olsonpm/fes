//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { getGenericHeader } from './helpers'

import {
  getHasDataArgument,
  getHasSupportArguments,
  recursivelyFind,
} from '../../helpers'

import {
  getSize_object as getSize,
  hasKey_object as hasKey,
} from '../../../lib'

//
//------//
// Main //
//------//

const approveFlippedFrom = (definition, arg) => {
  const { flippedFrom, name } = definition
  if (!flippedFrom) return

  const { approveDefinition, chain } = arg,
    genericHeader = getGenericHeader(definition)

  if (getSize(definition) > 2) {
    return new Error(
      tedent(`
        ${genericHeader}
        because this utility declares 'flippedFrom', it is not allowed to
        declare properties other than 'name'.

        If you need this functionality then file a github issue so I can support
        it.  My solution would be to expose a property 'isFlipped' which could
        then be used alongside 'mergeDefinitionWith'.  I don't have that
        currently because every use-case I've had thus far is to simply flip an
        existing utility.
      `)
    )
  }

  chain.push(`${name} flippedFrom`)
  const maybeInvalidFlippedFrom = approveDefinition(flippedFrom, { chain })
  chain.pop()
  if (maybeInvalidFlippedFrom) return maybeInvalidFlippedFrom

  const hasDataArgument = getHasDataArgument(definition),
    hasSupportArguments = getHasSupportArguments(definition)

  if (!(hasDataArgument && hasSupportArguments)) {
    return new Error(
      tedent(`
        ${genericHeader}

        you must flip a utility which has support arguments and a data
        argument.  Flipping means you flip the support and data arguments
        around e.g. \`getValueAt(key)(object)\` vs \`getValueFrom(object)(key)\`
      `)
    )
  }

  const flippedFromChain = isAlreadyFlippedFrom(definition)
  if (flippedFromChain) {
    return new Error(
      tedent(`
        ${genericHeader}

        fes is not built to allow utilities which are flipped multiple times.
        The utility which is already flipped was found here:
        ${name} flippedFrom -> ${flippedFromChain}
      `)
    )
  }
}

//
//------------------//
// Helper Functions //
//------------------//

//
// this function is called after 'flippedFrom' has already been determined to
//   be a key on 'definition', thus we only need to recurse
//
function isAlreadyFlippedFrom(definition) {
  const { flippedFrom } = definition,
    isFlipped = hasKey('flippedFrom')

  return flippedFrom && recursivelyFind(isFlipped, flippedFrom)
}

//
//---------//
// Exports //
//---------//

export default approveFlippedFrom
