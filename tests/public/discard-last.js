import 'chai/register-should'
import { discardLast } from '../../index'

suite('discardLast', () => {
  test('arrayLike', () => {
    const rankedBasketballTryouts = [
      'bob',
      'jill',
      'peter',
      'joe',
      'mary',
      'kathy',
      'mike',
    ]

    const dropTheWorstTwo = discardLast(2)
    const peopleWhoMadeTheTeam = dropTheWorstTwo(rankedBasketballTryouts)
    peopleWhoMadeTheTeam.should.deep.equal([
      'bob',
      'jill',
      'peter',
      'joe',
      'mary',
    ])
    peopleWhoMadeTheTeam.should.not.equal(rankedBasketballTryouts)
  })
})
