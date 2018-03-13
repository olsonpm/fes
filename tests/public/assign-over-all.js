//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { assignOverAll } from '../../index'

suite('assignOverAll', () => {
  test('map', () => {
    const personToPlacement = {
        2017: new Map([['phil', '3rd'], ['matt', '1st']]),
        2018: new Map([['phil', '2nd'], ['chris', '1st']]),
      },
      personToMostRecentPlacement = assignOverAll.maps([
        personToPlacement[2017],
        personToPlacement[2018],
      ])

    personToMostRecentPlacement.should.deep.equal(
      new Map([['phil', '2nd'], ['matt', '1st'], ['chris', '1st']])
    )
    // ensure assignOverAll doesn't mutate 2017's placements
    personToMostRecentPlacement.should.not.equal(personToPlacement[2017])
  })

  test('object', () => {
    const personToPlacement = {
        2017: {
          phil: '3rd',
          matt: '1st',
        },
        2018: {
          phil: '2nd',
          chris: '1st',
        },
      },
      personToMostRecentPlacement = assignOverAll.objects([
        personToPlacement[2017],
        personToPlacement[2018],
      ])

    personToMostRecentPlacement.should.deep.equal({
      phil: '2nd',
      matt: '1st',
      chris: '1st',
    })
    // ensure assignOverAll doesn't mutate 2017's placements
    personToMostRecentPlacement.should.not.equal(personToPlacement[2017])
  })

  test('set', () => {
    const favoriteFoods = {
        phil: new Set(['cotton candy', 'sushi']),
        matt: new Set(['cotton candy', 'pizza']),
      },
      allFavoriteFoods = assignOverAll.sets([
        favoriteFoods.phil,
        favoriteFoods.matt,
      ])

    allFavoriteFoods.should.deep.equal(
      new Set(['cotton candy', 'sushi', 'pizza'])
    )

    // ensure assignOverAll doesn't mutate phil's favorite foods
    allFavoriteFoods.should.not.equal(favoriteFoods.phil)
  })
})
