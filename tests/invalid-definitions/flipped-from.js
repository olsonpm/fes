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

suite('flipped-from', () => {
  const name = 'a',
    genericHeader = getGenericHeader({ name })

  test('no other properties allowed', () => {
    _approveDefinition({
      name,
      flippedFrom: {},
      isAsynchronous: true,
    })
      .should.be.an('error')
      .and.have.property(
        'message',
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
  })

  test('flippedFrom definition must be valid', () => {
    _approveDefinition({
      name,
      flippedFrom: {},
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          error found at: a flippedFrom

          this utility does not have a name
        `)
      )
  })

  test('flippedFrom definition must be valid - 2 levels', () => {
    _approveDefinition({
      name,
      flippedFrom: {
        name: 'b',
        expectedSupportArgumentTypes: ['string'],
        mergeDefinitionWith: {},
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          error found at: a flippedFrom -> b mergeDefinitionWith

          this utility does not have a name
        `)
      )
  })

  test('must flip a utility with data and support arguments', () => {
    _approveDefinition({
      name,
      flippedFrom: { name: 'b' },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}

          you must flip a utility which has support arguments and a data
          argument.  Flipping means you flip the support and data arguments
          around e.g. \`getValueAt(key)(object)\` vs \`getValueFrom(object)(key)\`
        `)
      )
  })

  test('cannot re-flip a utility', () => {
    _approveDefinition({
      name,
      flippedFrom: {
        name: 'b',
        flippedFrom: {
          name: 'c',
          expectedSupportArgumentTypes: ['string'],
          typeToFunction: { any: () => {} },
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}

          fes is not built to allow utilities which are flipped multiple times.
          The utility which is already flipped was found here:
          a flippedFrom -> b
        `)
      )
  })
})
