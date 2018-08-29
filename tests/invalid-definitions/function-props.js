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

suite('function-props', () => {
  const name = 'a'

  test('properties must be functions', () => {
    _approveDefinition({
      name,
      typeToFunction: {
        b: 0,
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${getGenericHeader({ name })}
          the following properties in 'typeToFunction' are not functions
            b: number
        `)
      )
  })
})
