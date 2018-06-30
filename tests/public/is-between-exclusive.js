//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { isBetweenExclusive } from '../../index'

suite('isEmpty', () => {
  test('number', () => {
    isBetweenExclusive(1, 3)(2).should.be.true
    isBetweenExclusive(1, 3)(3).should.be.false
  })
})
