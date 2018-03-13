import 'chai/register-should'
import { all } from '../../index'

suite('all', () => {
  const canRideRollerCoaster = heightInFeet => heightInFeet >= 4,
    canTheyAllRideTheRollerCoaster = all(canRideRollerCoaster)

  test('arrayLike', () => {
    const heights = {
      tallFamily: [6, 6, 7],
      children: [3, 4, 4],
    }

    canTheyAllRideTheRollerCoaster(heights.tallFamily).should.be.true
    canTheyAllRideTheRollerCoaster(heights.children).should.be.false
  })
  test('map', () => {
    const heights = {
      tallFamily: new Map([['dad', 6], ['mom', 6], ['son', 7]]),
      children: new Map([["'lil' georgey", 3], ['billy', 4], ['sally', 4]]),
    }

    canTheyAllRideTheRollerCoaster(heights.tallFamily).should.be.true
    canTheyAllRideTheRollerCoaster(heights.children).should.be.false
  })
  test('object', () => {
    const heights = {
      tallFamily: {
        dad: 6,
        mom: 6,
        son: 7,
      },
      children: {
        "'lil' georgey": 3,
        billy: 4,
        sally: 4,
      },
    }

    canTheyAllRideTheRollerCoaster(heights.tallFamily).should.be.true
    canTheyAllRideTheRollerCoaster(heights.children).should.be.false
  })

  test('set', () => {
    const gameOfThronesSellingTest = {
        phil: new Set(['Danarys', 'Sersei', 'Arya']),
        matt: new Set(['Daenerys', 'Cersei', 'Arya']),
      },
      correctAnswers = new Set(['Daenerys', 'Cersei', 'Arya']),
      answerIsCorrect = answer => correctAnswers.has(answer),
      allAnswersAreCorrect = all(answerIsCorrect)

    allAnswersAreCorrect(gameOfThronesSellingTest.phil).should.be.false
    allAnswersAreCorrect(gameOfThronesSellingTest.matt).should.be.true
  })
})
