//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { keepAll } from '../../index'

suite('keepAll', () => {
  test('arrayLike', () => {
    const classTestResults = [100, 99, 72, 100, 80],
      keep99And100s = keepAll([100, 99]),
      greatScores = keep99And100s(classTestResults)

    greatScores.should.deep.equal([100, 99, 100])
    greatScores.should.not.equal(classTestResults)
  })

  const typeOfExcerciseINeed = ['aerobic', 'strength'],
    getExercisesIWillDo = keepAll(typeOfExcerciseINeed)

  test('map', () => {
    const exerciseToType = new Map([
        ['run', 'aerobic'],
        ['touch your toes', 'stretch'],
        ['lift weights', 'strength'],
        ['swim', 'aerobic'],
      ]),
      myOptions = getExercisesIWillDo(exerciseToType)

    myOptions.should.deep.equal(
      new Map([
        ['run', 'aerobic'],
        ['lift weights', 'strength'],
        ['swim', 'aerobic'],
      ])
    )
    myOptions.should.not.equal(exerciseToType)
  })
  test('object', () => {
    const exerciseToType = {
        run: 'aerobic',
        'touch your toes': 'stretch',
        'lift weights': 'strength',
        swim: 'aerobic',
      },
      myOptions = getExercisesIWillDo(exerciseToType)

    myOptions.should.deep.equal({
      run: 'aerobic',
      'lift weights': 'strength',
      swim: 'aerobic',
    })
    myOptions.should.not.equal(exerciseToType)
  })

  test('string', () => {
    keepAll('ad')('asdfasdf').should.equal('adad')
  })
})
