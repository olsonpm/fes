//---------//
// Imports //
//---------//

import 'chai/register-should'

import tedent from 'tedent'

import { _approveDefinition, _validUtilityNameRe } from '../../index'

//
//------//
// Main //
//------//

suite('name', () => {
  test('missing', () => {
    _approveDefinition({})
      .should.be.an('error')
      .and.have.property('message', 'this utility does not have a name')
  })
  test('wrong type', () => {
    _approveDefinition({ name: 0 })
      .should.be.an('error')
      .and.have.property(
        'message',
        "the utility's name must be a string with one or more characters"
      )
  })
  test('must pass regex', () => {
    const name = '0'
    _approveDefinition({ name })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          the utility's name must pass the regex '${_validUtilityNameRe}'

          name given: ${name}
        `)
      )
  })
})
