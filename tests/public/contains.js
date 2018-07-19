import 'chai/register-should'
import { contains } from '../../index'

suite('contains', () => {
  const aFoodIWontEat = 'tomato',
    willIRefuseIt = contains(aFoodIWontEat)

  test('arrayLike', () => {
    const sandwich = {
      1: ['tomato', 'bacon', 'lettuce'],
      2: ['ham', 'cheese'],
    }

    willIRefuseIt(sandwich[1]).should.be.true
    willIRefuseIt(sandwich[2]).should.be.false
  })
  test('set', () => {
    const sandwich = {
      1: new Set(['tomato', 'bacon', 'lettuce']),
      2: new Set(['ham', 'cheese']),
    }

    willIRefuseIt(sandwich[1]).should.be.true
    willIRefuseIt(sandwich[2]).should.be.false
  })

  const doesSomeoneLikePizza = contains('pizza')

  test('map', () => {
    const favoriteFood = {
      group1: new Map([['phil', 'hotdog'], ['matt', 'pizza']]),
      group2: new Map([['chris', 'chicken'], ['sam', 'cotton candy']]),
    }

    doesSomeoneLikePizza(favoriteFood.group1).should.be.true
    doesSomeoneLikePizza(favoriteFood.group2).should.be.false
  })
  test('object', () => {
    const favoriteFood = {
      group1: {
        phil: 'hotdog',
        matt: 'pizza',
      },
      group2: {
        chris: 'chicken',
        sam: 'cotton candy',
      },
    }

    doesSomeoneLikePizza(favoriteFood.group1).should.be.true
    doesSomeoneLikePizza(favoriteFood.group2).should.be.false
  })

  //
  // TODO: revisit this test - 'twas rushed
  //
  test('string', () => {
    const originalFile = 'index.js',
      minifiedFile = 'index.min.js'

    contains('.min.')(originalFile).should.be.false
    contains('.min.')(minifiedFile).should.be.true
  })
})
