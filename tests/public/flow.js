//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { flow } from '../../index'

suite('flow', () => {
  test('any', () => {
    const toUpperCase = aString => aString.toUpperCase(),
      addExclamation = aString => `${aString}!@#`,
      scream = aString => flow([toUpperCase, addExclamation])(aString)

    const wilhelm = 'hruaaaiiii',
      wilhelmScream = scream(wilhelm)

    wilhelmScream.should.equal('HRUAAAIIII!@#')
  })
})
