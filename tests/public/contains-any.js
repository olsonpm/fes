//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { containsAny } from '../../index'

suite('containsAll', () => {
  const foodOnPlate = ['hotdogs', 'chips'],
    willIEatAnything = containsAny(foodOnPlate)

  test('arrayLike', () => {
    const foodIWillEat = {
      morning: ['eggs', 'spaghetti'],
      lunch: ['chips', 'pizza'],
    }

    willIEatAnything(foodIWillEat.morning).should.be.false
    willIEatAnything(foodIWillEat.lunch).should.be.true
  })
  test('set', () => {
    const foodIWillEat = {
      morning: new Set(['eggs', 'spaghetti']),
      lunch: new Set(['chips', 'pizza']),
    }

    willIEatAnything(foodIWillEat.morning).should.be.false
    willIEatAnything(foodIWillEat.lunch).should.be.true
  })

  const goodPicnicFood = ['peanut butter', 'jelly', 'good bread'],
    willTheyHaveAGoodPicnic = containsAny(goodPicnicFood)

  test('map', () => {
    const personToFoodBrought = {
      organized: new Map([
        ['phil', 'peanut butter'],
        ['matt', 'jelly'],
        ['chris', 'salad'],
        ['sam', 'chips'],
      ]),
      unorganized: new Map([
        ['phil', 'spaghetti'],
        ['matt', 'steak'],
        ['chris', 'soup'],
        ['sam', 'coffee'],
      ]),
    }

    willTheyHaveAGoodPicnic(personToFoodBrought.organized).should.be.true
    willTheyHaveAGoodPicnic(personToFoodBrought.unorganized).should.be.false
  })
  test('object', () => {
    const personToFoodBrought = {
      organized: {
        phil: 'peanut butter',
        matt: 'jelly',
        chris: 'salad',
        sam: 'chips',
      },
      unorganized: {
        phil: 'spaghetti',
        matt: 'steak',
        chris: 'soup',
        sam: 'coffee',
      },
    }

    willTheyHaveAGoodPicnic(personToFoodBrought.organized).should.be.true
    willTheyHaveAGoodPicnic(personToFoodBrought.unorganized).should.be.false
  })
})
