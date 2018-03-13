import 'chai/register-should'
import { discardAll } from '../../index'

suite('discardAll', () => {
  const toppingsIWillRemove = ['olives', 'salami'],
    withoutOlivesAndSalami = discardAll(toppingsIWillRemove)

  test('arrayLike', () => {
    const pizza = ['pepperoni', 'olives', 'mushroom', 'salami'],
      myPizza = withoutOlivesAndSalami(pizza)

    myPizza.should.deep.equal(['pepperoni', 'mushroom'])
    myPizza.should.not.equal(pizza)
  })
  test('set', () => {
    const pizza = new Set(['pepperoni', 'olives', 'mushroom', 'salami']),
      myPizza = withoutOlivesAndSalami(pizza)

    myPizza.should.deep.equal(new Set(['pepperoni', 'mushroom']))
    myPizza.should.not.equal(pizza)
  })

  const typesOfExerciseIWontDo = ['aerobic', 'balance'],
    getExercisesIWillDo = discardAll(typesOfExerciseIWontDo)

  test('map', () => {
    const exerciseToType = new Map([
        ['run', 'aerobic'],
        ['touch your toes', 'stretch'],
        ['lift weights', 'strength'],
        ['yoga', 'balance'],
      ]),
      tolerableExercises = getExercisesIWillDo(exerciseToType)

    tolerableExercises.should.deep.equal(
      new Map([['touch your toes', 'stretch'], ['lift weights', 'strength']])
    )
    tolerableExercises.should.not.equal(exerciseToType)
  })
  test('object', () => {
    const exerciseToType = {
        run: 'aerobic',
        'touch your toes': 'stretch',
        'lift weights': 'strength',
        yoga: 'balance',
      },
      tolerableExercises = getExercisesIWillDo(exerciseToType)

    tolerableExercises.should.deep.equal({
      'touch your toes': 'stretch',
      'lift weights': 'strength',
    })
    tolerableExercises.should.not.equal(exerciseToType)
  })
})
