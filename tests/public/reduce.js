import 'chai/register-should'
import { reduce } from '../../index'

suite('reduce', () => {
  test('arrayLike', () => {
    const toTotal = (cumulativeResult, gameScore) => {
        return cumulativeResult + gameScore
      },
      pinballGames = [3008, 40026, 8572],
      calculateTotalScore = reduce(toTotal, 0)

    const total = calculateTotalScore(pinballGames)
    total.should.equal(51606)
  })
  test('map', () => {
    const toTotal = (cumulativeResult, caloriesForTheDay) => {
        return cumulativeResult + caloriesForTheDay
      },
      caloriesLastThreeDays = new Map([
        ['monday', 2600],
        ['tuesday', 2500],
        ['wednesday', 2700],
      ]),
      calculateTotal = reduce(toTotal, 0),
      averageIntake = calculateTotal(caloriesLastThreeDays) / 3

    averageIntake.should.equal(2600)
  })
  test('object', () => {
    const toTotal = (cumulativeResult, caloriesForTheDay) => {
        return cumulativeResult + caloriesForTheDay
      },
      caloriesLastThreeDays = {
        monday: 2600,
        tuesday: 2500,
        wednesday: 2700,
      },
      calculateTotal = reduce(toTotal, 0),
      averageIntake = calculateTotal(caloriesLastThreeDays) / 3

    averageIntake.should.equal(2600)
  })
  test('set', () => {
    const toHandScore = (handScore, card) => {
        let cardScore = 0
        const hasHeart = card.indexOf('hearts') !== -1

        // the queen of spades is worth 13 points
        if (card === 'queen of spades') cardScore = 13
        else if (hasHeart) {
          // otherwise hearts count as one point.  All other cards are zero
          cardScore = 1
        }

        return handScore + cardScore
      },
      currentHand = new Set([
        'four of clubs',
        'ace of clubs',
        'queen of spades',
        'king of hearts',
      ]),
      calculateHandScore = reduce(toHandScore, 0)

    const score = calculateHandScore(currentHand)
    score.should.equal(14)
  })
})
