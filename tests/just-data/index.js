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

suite('just-data', () => {
  suite('simple: getCount', () => {
    const getCount = createUtility(definition.getCount),
      expected = allExpected.getCount

    test('success - array', () => {
      getCount(['a']).should.equal(1)
    })

    test('success - set', () => {
      getCount(new Set(['a'])).should.equal(1)
    })

    test('not enough arguments', () => {
      expect(() => getCount()).to.throw(expected.notEnoughArgs)
    })

    test('too many arguments', () => {
      expect(() => getCount(['a'], 'invalid')).to.throw(expected.tooManyArgs)
    })

    test('invalid type', () => {
      expect(() => getCount('invalid')).to.throw(expected.invalidType)
    })
  })

  suite('complex: contrived', () => {
    const contrived = createUtility(definition.contrived),
      expected = allExpected.contrived

    test('success - array', () => {
      return contrived(['a', 'b']).should.eventually.equal('AB')
    })
    test('success - set', () => {
      return contrived(new Set(['A', 'B'])).should.eventually.equal('ab')
    })

    test('not enough arguments', () => {
      return contrived().should.be.rejectedWith(expected.notEnoughArgs)
    })

    test('too many arguments', () => {
      return contrived(['a', 'b'], 'invalid').should.be.rejectedWith(
        expected.tooManyArgs
      )
    })

    test('invalid type', () => {
      return contrived('invalid').should.be.rejectedWith(expected.invalidType)
    })

    test('invalid array argument', () => {
      return contrived([]).should.be.rejectedWith(expected.invalidArrayArg)
    })

    test('invalid set argument', () => {
      return contrived(new Set()).should.be.rejectedWith(expected.invalidSetArg)
    })
  })
})
