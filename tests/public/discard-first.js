import 'chai/register-should'
import { discardFirst } from '../../index'

suite('discardFirst', () => {
  test('arrayLike', () => {
    const olympicSoccerTop8Teams = [
      'Brazil',
      'Germany',
      'Nigeria',
      'Honduras',
      'Columbia',
      'South Korea',
      'Denmark',
      'Portugal',
    ]

    const teamsWithoutMedals = discardFirst(3)(olympicSoccerTop8Teams)
    teamsWithoutMedals.should.deep.equal([
      'Honduras',
      'Columbia',
      'South Korea',
      'Denmark',
      'Portugal',
    ])
    teamsWithoutMedals.should.not.equal(olympicSoccerTop8Teams)
  })
})
