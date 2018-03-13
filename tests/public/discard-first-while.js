import 'chai/register-should'
import { discardFirstWhile } from '../../index'

suite('discardFirstWhile', () => {
  test('arrayLike', () => {
    const orderedClassScores = [95, 92, 90, 89, 80, 78, 75, 68],
      is90orAbove = score => {
        return score >= 90
      }

    const scoresBelow90 = discardFirstWhile(is90orAbove)(orderedClassScores)

    scoresBelow90.should.deep.equal([89, 80, 78, 75, 68])
    scoresBelow90.should.not.equal(orderedClassScores)
  })
})
