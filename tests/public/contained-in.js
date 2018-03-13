import 'chai/register-should'
import { containedIn } from '../../index'

suite('containedIn', () => {
  test('arrayLike', () => {
    const foodIWillEat = ['hotdogs', 'chips'],
      willIEat = containedIn(foodIWillEat)

    willIEat('spaghetti').should.be.false
    willIEat('hotdogs').should.be.true
  })
  test('set', () => {
    const foodIWillEat = new Set(['hotdogs', 'chips']),
      willIEat = containedIn(foodIWillEat)

    willIEat('spaghetti').should.be.false
    willIEat('hotdogs').should.be.true
  })

  test('map', () => {
    const foodBroughtToPicnic = new Map([
        ['phil', 'peanut butter'],
        ['matt', 'jelly'],
        ['chris', 'good bread'],
        ['sam', 'chips'],
      ]),
      isItAtThePicnic = containedIn(foodBroughtToPicnic)

    isItAtThePicnic('peanut butter').should.be.true
    isItAtThePicnic('tacos').should.be.false
  })
  test('object', () => {
    const foodBroughtToPicnic = {
        phil: 'peanut butter',
        matt: 'jelly',
        chris: 'good bread',
        sam: 'chips',
      },
      isItAtThePicnic = containedIn(foodBroughtToPicnic)

    isItAtThePicnic('peanut butter').should.be.true
    isItAtThePicnic('tacos').should.be.false
  })
})
