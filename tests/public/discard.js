import 'chai/register-should'
import { discard } from '../../index'

suite('discard', () => {
  const iWillRemoveThisTopping = 'olives',
    withoutOlives = discard(iWillRemoveThisTopping)

  test('arrayLike', () => {
    const pizza = ['pepperoni', 'olives', 'mushroom'],
      myPizza = withoutOlives(pizza)

    myPizza.should.deep.equal(['pepperoni', 'mushroom'])
    myPizza.should.not.equal(pizza)
  })
  test('set', () => {
    const pizza = new Set(['pepperoni', 'olives', 'mushroom']),
      myPizza = withoutOlives(pizza)

    myPizza.should.deep.equal(new Set(['pepperoni', 'mushroom']))
    myPizza.should.not.equal(pizza)
  })

  const typeOfExerciseIWontDo = 'aerobic',
    getExercisesIWillDo = discard(typeOfExerciseIWontDo)

  test('map', () => {
    const exerciseToType = new Map([
        ['run', 'aerobic'],
        ['touch your toes', 'stretch'],
        ['lift weights', 'strength'],
        ['swim', 'aerobic'],
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
        swim: 'aerobic',
      },
      tolerableExercises = getExercisesIWillDo(exerciseToType)

    tolerableExercises.should.deep.equal({
      'touch your toes': 'stretch',
      'lift weights': 'strength',
    })
    tolerableExercises.should.not.equal(exerciseToType)
  })
})
