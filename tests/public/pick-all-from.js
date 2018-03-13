//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { pickAllFrom } from '../../index'

suite('pickAllFrom', () => {
  const exercisesIWillDo = ['run', 'lift weights']

  test('map', () => {
    const exercisesAvailable = new Map([
      ['run', 'aerobic'],
      ['lift weights', 'strength'],
      ['swim', 'aerobic'],
    ])

    const myOptions = pickAllFrom(exercisesAvailable)(exercisesIWillDo)
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

    const myOptions = pickAllFrom(exercisesAvailable)(exercisesIWillDo)
    myOptions.should.deep.equal({
      run: 'aerobic',
      'lift weights': 'strength',
    })
    myOptions.should.not.equal(exercisesAvailable)
  })
})
