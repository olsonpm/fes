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

suite('no-data', () => {
  suite('simple: passThrough', () => {
    const passThrough = createUtility(definition.passThrough),
      expected = allExpected.passThrough,
      toUpper = aString => aString.toUpperCase()

    test('success', () => {
      passThrough('a', [toUpper]).should.equal('A')
    })

    test('not enough arguments', () => {
      expect(() => passThrough('a')).to.throw(expected.notEnoughArgs)
    })

    test('too many arguments', () => {
      expect(() => passThrough('a')).to.throw(expected.notEnoughArgs)
    })

    test('invalid argument type', () => {
      expect(() => passThrough('a', [toUpper], 'invalid')).to.throw(
        expected.tooManyArgs
      )
    })
  })

  suite('complex: contrived', () => {
    const contrived = createUtility(definition.contrived),
      expected = allExpected.contrived

    test('success', () => {
      return contrived(
        'correct',
        { correct: true },
        ['correct'],
        'extra argument is allowed'
      ).should.eventually.equal('true')
    })

    test('not enough arguments', () => {
      return contrived('correct', {
        correct: true,
      }).should.be.rejectedWith(expected.notEnoughArgs)
    })

    test('invalid argument type', () => {
      return contrived(
        'correct',
        {
          correct: true,
        },
        'invalid type'
      ).should.be.rejectedWith(expected.invalidType)
    })

    test('approveArguments first argument is incorrect', () => {
      return contrived('incorrect', { correct: true }, [
        'correct',
      ]).should.be.rejectedWith(expected.approveArguments.first)
    })

    test('approveArguments second argument is incorrect', () => {
      return contrived('correct', { correct: false }, [
        'correct',
      ]).should.be.rejectedWith(expected.approveArguments.second)
    })
  })
})
