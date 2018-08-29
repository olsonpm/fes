//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { getGenericHeader, maybeApproveExpectedTypes } from './helpers'
import { isEmpty_hasLength as isEmpty } from '../../../lib'

//
//------//
// Main //
//------//

const approveExpectedSupportArgumentTypes = definition => {
  const { expectedSupportArgumentTypes, name } = definition
  if (!expectedSupportArgumentTypes) return

  if (isEmpty(expectedSupportArgumentTypes)) {
    return new Error(
      `'${name}' cannot have an empty 'expectedSupportArgumentTypes'`
    )
  }

  const maybeInvalidExpectedTypes = maybeApproveExpectedTypes(
    expectedSupportArgumentTypes
  )
  if (maybeInvalidExpectedTypes) {
    return new Error(
      tedent(`
        ${getGenericHeader(definition)}
        expectedSupportArgumentTypes has the following invalid values
          ${maybeInvalidExpectedTypes}
      `)
    )
  }
}

//
//---------//
// Exports //
//---------//

export default approveExpectedSupportArgumentTypes
