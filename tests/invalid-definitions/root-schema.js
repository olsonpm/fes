//---------//
// Imports //
//---------//

import 'chai/register-should'

import tedent from 'tedent'

import { _approveDefinition } from '../../index'

//
//------//
// Main //
//------//

suite('root-schema', () => {
  const name = 'a',
    unexpected1 = true,
    unexpected2 = true

  test('one unexpected property', () => {
    _approveDefinition({ name, unexpected1 })
      .should.be.an('error')
      .and.have.property(
        'message',
        `the definition for '${name}' has the unexpected property 'unexpected1'`
      )
  })

  test('some unexpected properties', () => {
    _approveDefinition({ name, unexpected1, unexpected2 })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          the definition for '${name}' has some unexpected properties

          unexpected1, unexpected2
        `)
      )
  })

  test('one invalid property', () => {
    _approveDefinition({ name, isAsynchronous: 0 })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          the definition for '${name}' has a property with an invalid type
            'isAsynchronous' was given a type 'number' but expected 'boolean'
        `)
      )
  })

  test('some invalid properties', () => {
    _approveDefinition({
      name,
      isAsynchronous: 0,
      typeToFunction: 0,
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          the definition for '${name}' has some properties with an invalid type
            'isAsynchronous' was given a type 'number' but expected 'boolean'
            'typeToFunction' was given a type 'number' but expected 'object'
        `)
      )
  })
})
