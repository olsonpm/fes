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

suite('groups', () => {
  const name = 'a',
    genericHeader = getGenericHeader({ name })

  test('one group key must be a valid group', () => {
    _approveDefinition({
      name,
      groupToFunction: {
        b: () => {},
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'groupToFunction' has one invalid group 'b'
        `)
      )
  })

  test('some group keys must be valid groups', () => {
    _approveDefinition({
      name,
      groupToFunction: {
        b: () => {},
        c: () => {},
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'groupToFunction' has the invalid groups: b, c
        `)
      )
  })
})
