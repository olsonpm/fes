import 'chai/register-should'
import { pickAll } from '../../index'

suite('pickAll', () => {
  const exercisesIWillDo = ['run', 'lift weights'],
    pickExercisesIWillDo = pickAll(exercisesIWillDo)

  test('map', () => {
    const exercisesAvailable = new Map([
      ['run', 'aerobic'],
      ['lift weights', 'strength'],
      ['swim', 'aerobic'],
    ])

    const myOptions = pickExercisesIWillDo(exercisesAvailable)
    myOptions.should.deep.equal(
      new Map([['run', 'aerobic'], ['lift weights', 'strength']])
    )
    myOptions.should.not.equal(exercisesAvailable)
  })
  test('object', () => {
    const exercisesAvailable = {
      run: 'aerobic',
      'lift weights': 'strength',
      swim: 'aerobic',
    }

    const myOptions = pickExercisesIWillDo(exercisesAvailable)
    myOptions.should.deep.equal({
      run: 'aerobic',
      'lift weights': 'strength',
    })
    myOptions.should.not.equal(exercisesAvailable)
  })
})
