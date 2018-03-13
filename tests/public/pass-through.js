import 'chai/register-should'
import { passThrough } from '../../index'

suite('passThrough', () => {
  test('(any, array)', () => {
    const toUpperCase = aString => aString.toUpperCase(),
      addExclamation = aString => `${aString}!@#`,
      scream = aString => passThrough(aString, [toUpperCase, addExclamation])

    const wilhelm = 'hruaaaiiii',
      wilhelmScream = scream(wilhelm)

    wilhelmScream.should.equal('HRUAAAIIII!@#')
  })
})
