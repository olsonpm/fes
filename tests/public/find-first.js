//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { expect } from 'chai'
import { findFirst } from '../../index'

suite('findFirst', () => {
  const thomasHanks = { firstName: 'thomas', lastName: 'hanks' },
    tomHanks = { firstName: 'tom', lastName: 'hanks' },
    stephCurry = { firstName: 'stephen', lastName: 'curry' }

  test('arrayLike', () => {
    const celebs = [thomasHanks, stephCurry],
      getFirstStephCurry = findFirst(stephCurry),
      getFirstTom = findFirst(tomHanks)

    getFirstStephCurry(celebs).should.equal(stephCurry)
    expect(getFirstTom(celebs)).to.be.undefined
  })

  test('map', () => {
    const celebs = new Map([
        ['thomas hanks', thomasHanks],
        ['steph curry', stephCurry],
      ]),
      getFirstStephCurry = findFirst(stephCurry),
      getFirstTom = findFirst(tomHanks)

    getFirstStephCurry(celebs).should.equal(stephCurry)
    expect(getFirstTom(celebs)).to.be.undefined
  })

  test('set', () => {
    const celebs = new Set([thomasHanks, stephCurry]),
      getFirstStephCurry = findFirst(stephCurry),
      getFirstTom = findFirst(tomHanks)

    getFirstStephCurry(celebs).should.equal(stephCurry)
    expect(getFirstTom(celebs)).to.be.undefined
  })
})
