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

suite('data-dependent-props', () => {
  const name = 'a',
    unexpected1 = true,
    unexpected2 = true,
    header = `'${name}' has an invalid 'typeToDataDependentProps'`

  test('values must be objects', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: { notAnObject: 0 },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}
          the following properties are not objects
            notAnObject: number
        `)
      )
  })

  test('one unexpected property', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: { unexpected1 },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has an unexpected property 'unexpected1'
        `)
      )
  })

  test('some unexpected properties', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          unexpected1,
          unexpected2,
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has the unexpected properties: unexpected1, unexpected2
        `)
      )
  })

  test('one invalid property', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: { theFunction: 0 },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has a property with an invalid type
            'theFunction' was given a type 'number' but expected 'function'
        `)
      )
  })

  test('some invalid properties', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          theFunction: 0,
          transformResult: 0,
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has some properties with an invalid type
            'theFunction' was given a type 'number' but expected 'function'
            'transformResult' was given a type 'number' but expected 'function'
        `)
      )
  })

  test('empty expectedSupportArgumentTypes', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          expectedSupportArgumentTypes: [],
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' cannot have an empty 'expectedSupportArgumentTypes'
        `)
      )
  })

  test('invalid expectedSupportArgumentTypes', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          expectedSupportArgumentTypes: [0],
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has the following invalid expectedSupportArgumentTypes
            0
        `)
      )
  })

  test('empty transformSupportArguments', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          transformSupportArguments: [],
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' cannot have an empty 'transformSupportArguments'
        `)
      )
  })

  test('transformSupportArguments with non-integer keys', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          transformSupportArguments: { a: () => {} },
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' has transformSupportArguments with keys other than integers.
          This object or array is supposed to represent transforms for each
          support argument, where the index corresponds to the argument index.
          Keys other than integers just doesn't make sense in this case.
        `)
      )
  })

  test('invalid transformSupportArguments', () => {
    _approveDefinition({
      name,
      typeToDataDependentProps: {
        string: {
          transformSupportArguments: [0],
        },
      },
    })
      .should.be.an('error')
      .and.have.property(
        'message',
        tedent(`
          ${header}

          'string' is invalid
          the following properties in 'transformSupportArguments' are not functions
            0: number
        `)
      )
  })
})
