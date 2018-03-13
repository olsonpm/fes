import 'chai/register-should'
import { flatten } from '../../index'

suite('first', () => {
  test('arrayLike', () => {
    const class1Scores = [76, 81, 90, 88],
      class2Scores = [91, 78, 85, 95],
      homeschoolChild1Score = 87,
      homeschoolChild2Score = 79

    const classAndHomeschoolScores = [
        class1Scores,
        homeschoolChild1Score,
        class2Scores,
        homeschoolChild2Score,
      ],
      allScores = flatten(classAndHomeschoolScores)

    // prettier-ignore
    allScores.should.deep.equal([
      76, 81, 90, 88,
      87,
      91, 78, 85, 95,
      79
    ])
    allScores.should.not.equal(classAndHomeschoolScores)
  })
})
