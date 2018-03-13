import 'chai/register-should'
import { mAssignOver } from '../../index'

suite('mAssignOver', () => {
  test('map', () => {
    const personToPlacement = {
        2017: new Map([['phil', '3rd'], ['matt', '1st']]),
        2018: new Map([['phil', '2nd'], ['chris', '1st']]),
      },
      personToMostRecentPlacement = mAssignOver(personToPlacement[2017])(
        personToPlacement[2018]
      )

    personToMostRecentPlacement.should.deep.equal(
      new Map([['phil', '2nd'], ['matt', '1st'], ['chris', '1st']])
    )
    // ensure mAssignOver mutates 2017's placements
    personToMostRecentPlacement.should.equal(personToPlacement[2017])
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
      personToMostRecentPlacement = mAssignOver(personToPlacement[2017])(
        personToPlacement[2018]
      )

    personToMostRecentPlacement.should.deep.equal({
      phil: '2nd',
      matt: '1st',
      chris: '1st',
    })
    // ensure mAssignOver mutates 2017's placements
    personToMostRecentPlacement.should.equal(personToPlacement[2017])
  })

  test('set', () => {
    const favoriteFoods = {
        phil: new Set(['cotton candy', 'sushi']),
        matt: new Set(['cotton candy', 'pizza']),
      },
      allFavoriteFoods = mAssignOver(favoriteFoods.phil)(favoriteFoods.matt)

    allFavoriteFoods.should.deep.equal(
      new Set(['cotton candy', 'sushi', 'pizza'])
    )
    // ensure mAssignOver mutates phil's favorite foods
    allFavoriteFoods.should.equal(favoriteFoods.phil)
  })
})
