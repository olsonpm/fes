//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { containsOnly } from '../../index'

suite('containsOnly', () => {
  const foodOnPlate = ['hotdogs', 'chips'],
    willIEatEverything = containsOnly(foodOnPlate)

  test('arrayLike', () => {
    const foodIWillEat = {
      morning: ['eggs', 'spaghetti'],
      lunch: ['hotdogs', 'chips'],
    }

    willIEatEverything(foodIWillEat.morning).should.be.false
    willIEatEverything(foodIWillEat.lunch).should.be.true
  })
  test('set', () => {
    const foodIWillEat = {
      morning: new Set(['eggs', 'spaghetti']),
      lunch: new Set(['hotdogs', 'chips']),
    }

    willIEatEverything(foodIWillEat.morning).should.be.false
    willIEatEverything(foodIWillEat.lunch).should.be.true
  })

  const goodPicnicFood = ['peanut butter', 'jelly', 'good bread'],
    willTheyHaveAGoodPicnic = containsOnly(goodPicnicFood)

  test('map', () => {
    const personToFoodBrought = {
      organized: new Map([
        ['phil', 'peanut butter'],
        ['matt', 'jelly'],
        ['chris', 'good bread'],
      ]),
      unorganized: new Map([
        ['phil', 'peanut butter'],
        ['matt', 'peanut butter'],
        ['chris', 'chips'],
        ['sam', 'chips'],
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
        chris: 'good bread',
      },
      unorganized: {
        phil: 'peanut butter',
        matt: 'peanut butter',
        chris: 'chips',
        sam: 'chips',
      },
    }

    willTheyHaveAGoodPicnic(personToFoodBrought.organized).should.be.true
    willTheyHaveAGoodPicnic(personToFoodBrought.unorganized).should.be.false
  })
})
