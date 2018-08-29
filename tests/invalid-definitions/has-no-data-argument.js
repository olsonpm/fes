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

suite('has-no-data-argument', () => {
  const name = 'a',
    unexpected1 = true,
    unexpected2 = true,
    genericHeader = getGenericHeader({ name })

  test('cannot declare other root properties', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {},
      isAsynchronous: true,
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          because this utility declares 'hasNoDataArgument', it is not allowed to
          declare properties other than 'name'.
        `)
      )
  })

  test('one unexpected property', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: { unexpected1 },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'hasNoDataArgument' has the unexpected property 'unexpected1'
        `)
      )
  })

  test('some unexpected properties', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        unexpected1,
        unexpected2,
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          the definition for '${name}' has some unexpected properties

          unexpected1, unexpected2
        `)
      )
  })

  test('one invalid property', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: { isAsynchronous: 0 },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'hasNoDataArgument' has a property with an invalid type
            'isAsynchronous' was given a type 'number' but expected 'boolean'
        `)
      )
  })

  test('some unexpected properties', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        isAsynchronous: 0,
        theFunction: 0,
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'hasNoDataArgument' has some properties with an invalid type
            'isAsynchronous' was given a type 'number' but expected 'boolean'
            'theFunction' was given a type 'number' but expected 'function'
        `)
      )
  })

  test('empty expectedArgumentTypes', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        expectedArgumentTypes: [],
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'hasNoDataArgument' cannot have an empty 'expectedSupportArgumentTypes'
        `)
      )
  })

  test('invalid expectedArgumentTypes', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        expectedArgumentTypes: [0],
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          expectedArgumentTypes has the following invalid values
            0
        `)
      )
  })

  test('empty transformArguments', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        transformArguments: [],
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          'hasNoDataArgument' cannot have an empty 'transformArguments'
        `)
      )
  })

  test('invalid transformArguments', () => {
    _approveDefinition({
      name,
      hasNoDataArgument: {
        transformArguments: ['a'],
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${genericHeader}
          the following properties in 'transformArguments' are not functions
            0: string
        `)
      )
  })

  test("utilities with a data argument cannot merge with a utility that doesn't have a data argument", () => {
    _approveDefinition({
      name,
      mergeDefinitionWith: {
        name: 'b',
        hasNoDataArgument: {},
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          utilities with a data argument cannot merge or be flipped from utilities
          that declare 'hasNoDataArgument'

          hasNoDataArgument was declared at the utility found here:
          a mergeDefinitionWith -> b
        `)
      )
  })

  suite('invalid merge', () => {
    test('no name', () => {
      _approveDefinition({
        name,
        hasNoDataArgument: {
          mergeDefinitionWith: {},
        },
      })
        .should.be.an('error')
        .and.have.property(
          'message',
          tedent(`
            the utility you're merging with doesn't have a name.  All utilities must
            have a name.
          `)
        )
    })

    test('no hasNoDataArgument', () => {
      _approveDefinition({
        name,
        hasNoDataArgument: {
          mergeDefinitionWith: { name: 'b' },
        },
      })
        .should.be.an('error')
        .and.have.property(
          'message',
          tedent(`
            a utility that 'hasNoDataArgument' can only merge with other utilities
            with no data argument.  Otherwise you'd end up with a utility that doesn't
            know whether it has a data argument!
          `)
        )
    })

    test('no name - 2 levels', () => {
      _approveDefinition({
        name,
        hasNoDataArgument: {
          mergeDefinitionWith: {
            name: 'b',
            hasNoDataArgument: {
              mergeDefinitionWith: {},
            },
          },
        },
      })
        .should.be.an('error')
        .and.have.property(
          'message',
          tedent(`
            found at: a -> b

            the utility you're merging with doesn't have a name.  All utilities must
            have a name.
          `)
        )
    })

    test('no name - 3 levels', () => {
      _approveDefinition({
        name,
        hasNoDataArgument: {
          mergeDefinitionWith: {
            name: 'b',
            hasNoDataArgument: {
              mergeDefinitionWith: {
                name: 'c',
                hasNoDataArgument: {
                  mergeDefinitionWith: {},
                },
              },
            },
          },
        },
      })
        .should.be.an('error')
        .and.have.property(
          'message',
          tedent(`
            found at: a -> b -> c

            the utility you're merging with doesn't have a name.  All utilities must
            have a name.
          `)
        )
    })
  })
})
