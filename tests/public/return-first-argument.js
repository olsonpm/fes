import 'chai/register-should'
import { reduce, returnFirstArgument } from '../../index'

suite('returnFirstArgument', () => {
  test('any', () => {
    const triple = score => score * 3,
      double = score => score * 2,
      dartScores = [
        { score: 20 },
        { score: 10, modifier: triple },
        { score: 15, modifier: double },
      ],
      toTotal = (cumulativeResult, dartScore) => {
        const { score, modifier = returnFirstArgument } = dartScore,
          modifiedScore = modifier(score)
        return cumulativeResult + modifiedScore
      },
      calculateTotal = reduce(toTotal, 0)

    const total = calculateTotal(dartScores)
    total.should.equal(80)
  })
})
