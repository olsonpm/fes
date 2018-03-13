import 'chai/register-should'
import { keepFirst } from '../../index'

suite('keepFirst', () => {
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

    const teamsWithMedals = keepFirst(3)(olympicSoccerTop8Teams)
    teamsWithMedals.should.deep.equal(['Brazil', 'Germany', 'Nigeria'])
    teamsWithMedals.should.not.equal(olympicSoccerTop8Teams)
  })
})
