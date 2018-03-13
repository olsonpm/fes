//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!  There are a lot of missing cases to be written
//

import 'chai/register-should'
import { assignOverRecursively } from '../../index'

suite('assignOverRecursively', () => {
  test('map', () => {
    const personToInfo1 = new Map([
      [
        'phil',
        {
          street: 'fury road',
          city: 'some city',
          favoriteFoods: new Set(['apples', 'bananas']),
        },
      ],
      [
        'matt',
        {
          street: 'matt street',
          city: 'a different city',
          favoriteFoods: new Set(['paninis', 'linquine']),
        },
      ],
    ])

    const personToInfo2 = new Map([
      [
        'phil',
        {
          street: 'elm street',
          favoriteFoods: new Set(['and bears, oh my']),
        },
      ],
    ])

    const mergedInfo = assignOverRecursively(personToInfo1)(personToInfo2)

    mergedInfo.should.deep.equal(
      new Map([
        [
          'phil',
          {
            street: 'elm street',
            city: 'some city',
            favoriteFoods: new Set(['apples', 'bananas', 'and bears, oh my']),
          },
        ],
        [
          'matt',
          {
            street: 'matt street',
            city: 'a different city',
            favoriteFoods: new Set(['paninis', 'linquine']),
          },
        ],
      ])
    )
    // ensure assignOverRecursively doesn't mutate 2017's placements
    mergedInfo.should.not.equal(personToInfo1)
  })

  test('object', () => {
    const personToInfo1 = {
      phil: new Map([
        ['street', 'fury road'],
        ['city', 'some city'],
        ['favoriteFoods', new Set(['apples', 'bananas'])],
      ]),
      matt: {
        street: 'matt street',
        city: 'a different city',
        favoriteFoods: new Set(['paninis', 'linquine']),
      },
    }

    const personToInfo2 = {
      phil: new Map([
        ['street', 'elm street'],
        ['favoriteFoods', new Set(['and bears, oh my'])],
      ]),
    }

    const mergedInfo = assignOverRecursively(personToInfo1)(personToInfo2)

    mergedInfo.should.deep.equal({
      phil: new Map([
        ['street', 'elm street'],
        ['city', 'some city'],
        ['favoriteFoods', new Set(['apples', 'bananas', 'and bears, oh my'])],
      ]),
      matt: {
        street: 'matt street',
        city: 'a different city',
        favoriteFoods: new Set(['paninis', 'linquine']),
      },
    })

    // ensure assignOverRecursively doesn't mutate 2017's placements
    mergedInfo.should.not.equal(personToInfo1)
  })
})
