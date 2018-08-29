//---------//
// Imports //
//---------//

import 'chai/register-should'

import tedent from 'tedent'

import { getGenericHeader } from '../../create-utility/approve/definition/helpers'
import { _approveDefinition } from '../../index'

//
//------//
// Main //
//------//

suite('expected-support-argument-types', () => {
  const name = 'a'

  test('cannot be empty', () => {
    _approveDefinition({
      name,
      expectedSupportArgumentTypes: [],
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        `'${name}' cannot have an empty 'expectedSupportArgumentTypes'`
      )
  })

  test('can only hold strings and arrays of strings', () => {
    _approveDefinition({
      name,
      expectedSupportArgumentTypes: [0],
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${getGenericHeader({ name })}
          expectedSupportArgumentTypes has the following invalid values
            0
        `)
      )
  })
})
