//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { none } from '../../index'

suite('none', () => {
  const canRideRollerCoaster = heightInFeet => heightInFeet >= 5,
    canNoneOfThemRideTheRollerCoaster = none(canRideRollerCoaster)

  test('arrayLike', () => {
    const heights = {
      family: [5, 4, 6],
      children: [3, 4, 4],
    }

    canNoneOfThemRideTheRollerCoaster(heights.family).should.be.false
    canNoneOfThemRideTheRollerCoaster(heights.children).should.be.true
  })
  test('map', () => {
    const heights = {
      family: new Map([['dad', 5], ['daughter', 4], ['son', 6]]),
      children: new Map([["'lil' georgey", 3], ['billy', 4], ['sally', 4]]),
    }

    canNoneOfThemRideTheRollerCoaster(heights.family).should.be.false
    canNoneOfThemRideTheRollerCoaster(heights.children).should.be.true
  })
  test('object', () => {
    const heights = {
      family: {
        dad: 5,
        mom: 4,
        son: 6,
      },
      children: {
        "'lil' georgey": 3,
        billy: 4,
        sally: 4,
      },
    }

    canNoneOfThemRideTheRollerCoaster(heights.family).should.be.false
    canNoneOfThemRideTheRollerCoaster(heights.children).should.be.true
  })

  test('set', () => {
    const gameOfThronesSellingTest = {
        phil: new Set(['Danarys', 'Sersei', 'Aria']),
        matt: new Set(['Daenerys', 'Cersei', 'Arya']),
      },
      correctAnswers = new Set(['Daenerys', 'Cersei', 'Arya']),
      answerIsCorrect = answer => correctAnswers.has(answer)

    none(answerIsCorrect)(gameOfThronesSellingTest.phil).should.be.true
    none(answerIsCorrect)(gameOfThronesSellingTest.matt).should.be.false
  })
})
