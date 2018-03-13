import 'chai/register-should'
import { first } from '../../index'

suite('first', () => {
  test('arrayLike', () => {
    const orderedClassScores = [95, 91, 85, 78, 75],
      topScore = first(orderedClassScores)

    topScore.should.equal(95)
  })
})
