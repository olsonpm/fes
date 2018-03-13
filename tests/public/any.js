import 'chai/register-should'
import { any } from '../../index'

suite('any', () => {
  const canRideRollerCoaster = heightInFeet => heightInFeet >= 5,
    canAnyOfThemRideTheRollerCoaster = any(canRideRollerCoaster)

  test('arrayLike', () => {
    const heights = {
      family: [5, 4, 6],
      children: [3, 4, 4],
    }

    canAnyOfThemRideTheRollerCoaster(heights.family).should.be.true
    canAnyOfThemRideTheRollerCoaster(heights.children).should.be.false
  })
  test('map', () => {
    const heights = {
      family: new Map([['dad', 5], ['daughter', 4], ['son', 6]]),
      children: new Map([["'lil' georgey", 3], ['billy', 4], ['sally', 4]]),
    }

    canAnyOfThemRideTheRollerCoaster(heights.family).should.be.true
    canAnyOfThemRideTheRollerCoaster(heights.children).should.be.false
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

    canAnyOfThemRideTheRollerCoaster(heights.family).should.be.true
    canAnyOfThemRideTheRollerCoaster(heights.children).should.be.false
  })

  test('set', () => {
    const gameOfThronesSellingTest = {
        phil: new Set(['Danarys', 'Sersei', 'Aria']),
        matt: new Set(['Daenerys', 'Cersei', 'Arya']),
      },
      correctAnswers = new Set(['Daenerys', 'Cersei', 'Arya']),
      answerIsCorrect = answer => correctAnswers.has(answer)

    any(answerIsCorrect)(gameOfThronesSellingTest.phil).should.be.false
    any(answerIsCorrect)(gameOfThronesSellingTest.matt).should.be.true
  })
})
