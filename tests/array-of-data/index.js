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

suite('array-of-data', () => {
  suite('simple: sumAll', () => {
    const sumAll = createUtility(definition.sumAll),
      expected = allExpected.sumAll

    test('success - array', () => {
      sumAll.arrays([[1, 2], [3]]).should.equal(6)
    })

    test('success - set', () => {
      sumAll.sets([new Set([1, 2]), new Set([3])]).should.equal(6)
    })

    test('call directly', () => {
      expect(() => sumAll([[1, 2], [3]])).to.throw(expected.directCall)
    })

    test('call directly - no hint', () => {
      expect(() => sumAll([])).to.throw

      try {
        sumAll([])
      } catch (e) {
        e.message.should.equal(expected.directCallNoHint)
      }
    })

    test('not enough args', () => {
      expect(() => sumAll.arrays()).to.throw(expected.notEnoughArgs)
    })

    test('too many args', () => {
      expect(() => sumAll.arrays([], 'invalid')).to.throw(expected.tooManyArgs)
    })

    test('argument not an array', () => {
      expect(() => sumAll.arrays('invalid')).to.throw(expected.invalidType)
    })

    test('invalid element type', () => {
      expect(() => sumAll.arrays([new Set([1, 2])])).to.throw(
        expected.invalidElementType
      )
    })
  })

  suite('simple: sumAll', () => {
    const contrived = createUtility(definition.contrived),
      expected = allExpected.contrived

    test('success - array', () => {
      return contrived.arrays([[1, 2], [3]]).should.eventually.equal(8)
    })

    test('success - set', () => {
      return contrived
        .sets([new Set([1, 2]), new Set([3])])
        .should.eventually.equal(7)
    })

    test('call directly', () => {
      return contrived([[1, 2], [3]]).should.be.rejectedWith(
        expected.directCall
      )
    })

    test('call directly - no hint', async () => {
      await contrived([]).should.be.rejected

      return contrived([]).catch(e => {
        e.message.should.equal(expected.directCallNoHint)
      })
    })

    test('not enough args', () => {
      return contrived.arrays().should.be.rejectedWith(expected.notEnoughArgs)
    })

    test('too many args', () => {
      return contrived
        .arrays([], 'invalid')
        .should.be.rejectedWith(expected.tooManyArgs)
    })

    test('argument not an array', () => {
      return contrived
        .arrays('invalid')
        .should.be.rejectedWith(expected.invalidType)
    })

    test('invalid element type', () => {
      return contrived
        .arrays([new Set([1, 2])])
        .should.be.rejectedWith(expected.invalidElementType)
    })
  })
})
