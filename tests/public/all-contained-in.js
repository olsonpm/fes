import 'chai/register-should'
import { allContainedIn } from '../../index'

suite('allContainedIn', () => {
  const onPlate = {
    1: ['pizza', 'broccoli', 'chips'],
    2: ['hotdogs', 'chips'],
  }

  test('arrayLike', () => {
    const foodIWillEat = ['pizza', 'hotdogs', 'chips'],
      willIEatEverything = allContainedIn(foodIWillEat)

    willIEatEverything(onPlate[1]).should.be.false
    willIEatEverything(onPlate[2]).should.be.true
  })
  test('set', () => {
    const foodIWillEat = new Set(['pizza', 'hotdogs', 'chips']),
      willIEatEverything = allContainedIn(foodIWillEat)

    willIEatEverything(onPlate[1]).should.be.false
    willIEatEverything(onPlate[2]).should.be.true
  })

  const picnicMustHaves = {
    1: ['peanut butter', 'jelly', 'good bread'],
    2: ['chicken', 'tortillas', 'cheese'],
  }

  test('map', () => {
    const personToFoodBrought = new Map([
        ['phil', 'peanut butter'],
        ['matt', 'jelly'],
        ['chris', 'good bread'],
        ['sam', 'chips'],
      ]),
      willTheyHaveAGoodPicnic = allContainedIn(personToFoodBrought)

    willTheyHaveAGoodPicnic(picnicMustHaves[1]).should.be.true
    willTheyHaveAGoodPicnic(picnicMustHaves[2]).should.be.false
  })
  test('object', () => {
    const personToFoodBrought = {
        phil: 'peanut butter',
        matt: 'jelly',
        chris: 'good bread',
        sam: 'chips',
      },
      willTheyHaveAGoodPicnic = allContainedIn(personToFoodBrought)

    willTheyHaveAGoodPicnic(picnicMustHaves[1]).should.be.true
    willTheyHaveAGoodPicnic(picnicMustHaves[2]).should.be.false
  })
})
