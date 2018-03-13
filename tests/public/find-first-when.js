//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { expect } from 'chai'
import { findFirstWhen } from '../../index'

suite('findFirstWhen', () => {
  const tomHanks = { firstName: 'thomas', lastName: 'hanks' },
    steveO = { firstName: 'stephen', lastName: 'glover' },
    stephCurry = { firstName: 'stephen', lastName: 'curry' }

  test('arrayLike', () => {
    const celebs = [tomHanks, steveO, stephCurry],
      getFirstStephen = findFirstWhen(celeb => celeb.firstName === 'stephen'),
      getFirstTom = findFirstWhen(celeb => celeb.firstName === 'tom')

    getFirstStephen(celebs).should.equal(steveO)
    expect(getFirstTom(celebs)).to.be.undefined
  })

  test('map', () => {
    const celebs = new Map([
        ['tom hanks', tomHanks],
        ['steveO', steveO],
        ['steph curry', stephCurry],
      ]),
      getFirstStephen = findFirstWhen(celeb => celeb.firstName === 'stephen'),
      getFirstTom = findFirstWhen(celeb => celeb.firstName === 'tom')

    getFirstStephen(celebs).should.equal(steveO)
    expect(getFirstTom(celebs)).to.be.undefined
  })

  test('set', () => {
    const celebs = new Set([tomHanks, steveO, stephCurry]),
      getFirstStephen = findFirstWhen(celeb => celeb.firstName === 'stephen'),
      getFirstTom = findFirstWhen(celeb => celeb.firstName === 'tom')

    getFirstStephen(celebs).should.equal(steveO)
    expect(getFirstTom(celebs)).to.be.undefined
  })
})
