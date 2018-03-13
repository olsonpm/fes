import 'chai/register-should'
import { unique } from '../../index'

suite('unique', () => {
  test('arrayLike', () => {
    const votesForNextDoritosFlavor = [
      'pancakes',
      'spicy chocolate',
      'banana cream',
      'pancakes',
      'spicy chocolate',
    ]

    const allFlavors = unique(votesForNextDoritosFlavor)
    allFlavors.should.deep.equal([
      'pancakes',
      'spicy chocolate',
      'banana cream',
    ])
  })
})
