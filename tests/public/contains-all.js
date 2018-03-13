import 'chai/register-should'
import { containsAll } from '../../index'

suite('containsAll', () => {
  const foodOnPlate = ['hotdogs', 'chips'],
    willIEatEverything = containsAll(foodOnPlate)

  test('arrayLike', () => {
    const foodIWillEat = {
      morning: ['eggs', 'spaghetti'],
      lunch: ['hotdogs', 'chips', 'pizza'],
    }

    willIEatEverything(foodIWillEat.morning).should.be.false
    willIEatEverything(foodIWillEat.lunch).should.be.true
  })
  test('set', () => {
    const foodIWillEat = {
      morning: new Set(['eggs', 'spaghetti']),
      lunch: new Set(['hotdogs', 'chips', 'pizza']),
    }

    willIEatEverything(foodIWillEat.morning).should.be.false
    willIEatEverything(foodIWillEat.lunch).should.be.true
  })

  const goodPicnicFood = ['peanut butter', 'jelly', 'good bread'],
    willTheyHaveAGoodPicnic = containsAll(goodPicnicFood)

  test('map', () => {
    const personToFoodBrought = {
      organized: new Map([
        ['phil', 'peanut butter'],
        ['matt', 'jelly'],
        ['chris', 'good bread'],
        ['sam', 'chips'],
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
        sam: 'chips',
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
