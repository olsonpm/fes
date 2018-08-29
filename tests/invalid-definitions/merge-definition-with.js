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

suite('merge-definition-with', () => {
  const name = 'a'

  test('must merge a valid definition', () => {
    _approveDefinition({
      name,
      mergeDefinitionWith: {},
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          error found at: a mergeDefinitionWith

          this utility does not have a name
        `)
      )
  })

  test('must merge a valid definition - 2 levels', () => {
    _approveDefinition({
      name,
      mergeDefinitionWith: {
        name: 'b',
        mergeDefinitionWith: {},
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          error found at: a mergeDefinitionWith -> b mergeDefinitionWith

          this utility does not have a name
        `)
      )
  })
})
