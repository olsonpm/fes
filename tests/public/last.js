import 'chai/register-should'
import { last } from '../../index'

suite('last', () => {
  test('arrayLike', () => {
    const orderedClassScores = [95, 91, 85, 78, 75],
      lowScore = last(orderedClassScores)

    lowScore.should.equal(75)
  })
})
