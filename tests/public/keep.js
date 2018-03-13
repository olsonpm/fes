import 'chai/register-should'
import { keep } from '../../index'

suite('keep', () => {
  test('arrayLike', () => {
    const classTestResults = [100, 95, 72, 100, 80],
      getPerfectScores = keep(100),
      perfectScores = getPerfectScores(classTestResults)

    perfectScores.should.deep.equal([100, 100])
    perfectScores.should.not.equal(classTestResults)
  })

  const typeOfExcerciseINeed = 'aerobic',
    getExercisesIWillDo = keep(typeOfExcerciseINeed)

  test('map', () => {
    const exerciseToType = new Map([
        ['run', 'aerobic'],
        ['touch your toes', 'stretch'],
        ['lift weights', 'strength'],
        ['swim', 'aerobic'],
      ]),
      myOptions = getExercisesIWillDo(exerciseToType)

    myOptions.should.deep.equal(
      new Map([['run', 'aerobic'], ['swim', 'aerobic']])
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
      swim: 'aerobic',
    })
    myOptions.should.not.equal(exerciseToType)
  })

  //
  // TODO: Revisit this test.  It was rushed because I'm trying to get something
  //   else done!
  //
  test('string', () => {
    keep('a')('asdfasdf').should.equal('aa')
  })
})
