//---------//
// Imports //
//---------//

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import definition from './lib'
import allExpected from './expected'
import { createUtility } from '../../index'

//
//------//
// Init //
//------//

chai.should()
chai.use(chaiAsPromised)

const { expect } = chai

//
//------//
// Main //
//------//

suite('supported-data', () => {
  suite('simple: keepFirst', () => {
    const keepFirst = createUtility(definition.keepFirst),
      expected = allExpected.keepFirst

    test('success - array', () => {
      keepFirst(2)(['a', 'b', 'c']).should.deep.equal(['a', 'b'])
    })

    test('success - string', () => {
      keepFirst(2)('abc').should.equal('ab')
    })

    test('too many data arguments is okay', () => {
      keepFirst(2)('abc', 'ignored').should.equal('ab')
    })

    test('not enough support arguments', () => {
      expect(() => keepFirst()).to.throw(expected.notEnoughSupportArgs)
    })

    test('not enough data arguments', () => {
      expect(() => keepFirst(2)()).to.throw(expected.notEnoughDataArgs)
    })

    test('too many support arguments', () => {
      expect(() => keepFirst(2, 'invalid')).to.throw(
        expected.tooManySupportArgs
      )
    })

    test('invalid support arg type', () => {
      expect(() => keepFirst('invalid')).to.throw(
        expected.invalidSupportArgType
      )
    })

    test('invalid data arg type', () => {
      expect(() => keepFirst(2)({})).to.throw(expected.invalidDataArgType)
    })
  })

  suite('flippedFrom: getValueFrom', () => {
    const getValueFrom = createUtility(definition.getValueFrom),
      expected = allExpected.getValueFrom

    test('success - object', () => {
      getValueFrom({ a: 'b' })('a').should.equal('b')
    })

    test('success - map', () => {
      getValueFrom(new Map([['a', 'b']]))('a').should.equal('b')
    })

    test('number type works for object', () => {
      getValueFrom({ '1': 2 })(1).should.equal(2)
    })

    test('too many support arguments is okay', () => {
      getValueFrom({ a: 'b' })('a', 'invalid').should.equal('b')
    })

    test('not enough data arguments', () => {
      expect(() => getValueFrom()).to.throw(expected.notEnoughDataArgs)
    })

    test('too many data arguments', () => {
      expect(() => getValueFrom({ a: 'b' }, 'invalid')).to.throw(
        expected.tooManyDataArgs
      )
    })

    test('invalid support argument type', () => {
      expect(() => getValueFrom({ a: 'b' })(null)).to.throw(
        expected.invalidSupportArgType
      )
    })
  })

  suite('complex - contrived1', () => {
    const contrived1 = createUtility(definition.contrived1)

    suite('string', () => {
      const expected = allExpected.contrived1.string

      test('success', () => {
        contrived1('A')(1).should.equal('1_a')
      })
      test('invalid support arg type', () => {
        expect(() => contrived1('a')('invalid')).to.throw(
          expected.invalidSupportArgType
        )
      })
      test('invalid support arg', () => {
        expect(() => contrived1('A')(2)).to.throw(expected.invalidSupportArg)
      })
      test('invalid data arg - string', () => {
        expect(() => contrived1('b')(1)).to.throw(expected.invalidDataArg)
      })
    })

    suite('set', () => {
      const expected = allExpected.contrived1.set

      test('success - set', () => {
        contrived1(new Set(['anything']))('a').should.equal('A_1')
      })
      test('invalid support arg type - array', () => {
        expect(() => contrived1(new Set(['anything']))(1)).to.throw(
          expected.invalidSupportArgType
        )
      })
      test('invalid support arg - array', () => {
        expect(() => contrived1(new Set(['anything']))('b')).to.throw(
          expected.invalidSupportArg
        )
      })
      test('invalid data arg - array', () => {
        expect(() =>
          contrived1(new Set(['anything', 'too many']))('a')
        ).to.throw(expected.invalidDataArg)
      })
    })

    suite('array', () => {
      const expected = allExpected.contrived1.array

      test('success - array', () => {
        contrived1(['anything'])('A').should.equal('a_1')
      })
      test('invalid support arg type - array', () => {
        expect(() => contrived1(['anything'])(1)).to.throw(
          expected.invalidSupportArgType
        )
      })
      test('invalid support arg - array', () => {
        expect(() => contrived1(['anything'])('b')).to.throw(
          expected.invalidSupportArg
        )
      })
      test('invalid data arg - array', () => {
        expect(() => contrived1(['anything', 'too many'])('A')).to.throw(
          expected.invalidDataArg
        )
      })
    })
  })

  suite('complex - contrived2', () => {
    const contrived2 = createUtility(definition.contrived2)

    suite('array', () => {
      const expected = allExpected.contrived2.array

      test('success', () => {
        contrived2('a')(['anything']).should.equal('A_1')
      })
      test('invalid support arg type', () => {
        expect(() => contrived2(1)(['anything'])).to.throw(
          expected.invalidSupportArgType
        )
      })
      test('invalid support arg', () => {
        expect(() => contrived2('b')(['anything'])).to.throw(
          expected.invalidSupportArg
        )
      })
    })

    suite('string', () => {
      const expected = allExpected.contrived2.string

      test('success', () => {
        contrived2(1)('a').should.equal('2_a')
      })
      test('invalid support arg type', () => {
        expect(() => contrived2('invalid')('a')).to.throw(
          expected.invalidSupportArgType
        )
      })
      test('invalid support arg', () => {
        expect(() => contrived2(2)('a')).to.throw(expected.invalidSupportArg)
      })
    })
  })
})
