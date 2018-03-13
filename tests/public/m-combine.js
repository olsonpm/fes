//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { mCombine } from '../../index'

suite('mCombine', () => {
  test('map', () => {
    const personToPlacement = {
        2017: new Map([['phil', '3rd'], ['matt', '1st']]),
        2018: new Map([['sam', '2nd'], ['chris', '1st']]),
      },
      personToMostRecentPlacement = mCombine(personToPlacement[2017])(
        personToPlacement[2018]
      )

    personToMostRecentPlacement.should.deep.equal(
      new Map([
        ['phil', '3rd'],
        ['matt', '1st'],
        ['sam', '2nd'],
        ['chris', '1st'],
      ])
    )
    // ensure mCombine mutates 2017's placements
    personToMostRecentPlacement.should.equal(personToPlacement[2017])
  })

  test('object', () => {
    const personToPlacement = {
        2017: {
          phil: '3rd',
          matt: '1st',
        },
        2018: {
          sam: '2nd',
          chris: '1st',
        },
      },
      personToMostRecentPlacement = mCombine(personToPlacement[2017])(
        personToPlacement[2018]
      )

    personToMostRecentPlacement.should.deep.equal({
      phil: '3rd',
      matt: '1st',
      sam: '2nd',
      chris: '1st',
    })
    // ensure mCombine mutates 2017's placements
    personToMostRecentPlacement.should.equal(personToPlacement[2017])
  })

  test('set', () => {
    const favoriteFoods = {
        phil: new Set(['cotton candy', 'sushi']),
        matt: new Set(['apple', 'pizza']),
      },
      allFavoriteFoods = mCombine(favoriteFoods.phil)(favoriteFoods.matt)

    allFavoriteFoods.should.deep.equal(
      new Set(['cotton candy', 'sushi', 'apple', 'pizza'])
    )
    // ensure mCombine mutates phil's favorite foods
    allFavoriteFoods.should.equal(favoriteFoods.phil)
  })
})
