import 'chai/register-should'
import { discardLastWhile } from '../../index'

suite('discardLastWhile', () => {
  test('arrayLike', () => {
    const orderedClassScores = [95, 92, 90, 89, 80, 78, 75, 68],
      isBelow80 = score => {
        return score < 80
      }

    const scores80AndAbove = discardLastWhile(isBelow80)(orderedClassScores)

    scores80AndAbove.should.deep.equal([95, 92, 90, 89, 80])
    scores80AndAbove.should.not.equal(orderedClassScores)
  })
})
