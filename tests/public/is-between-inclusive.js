//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { isBetweenInclusive } from '../../index'

suite('isEmpty', () => {
  test('number', () => {
    isBetweenInclusive(1, 1)(1).should.be.true
    isBetweenInclusive(1, 1)(2).should.be.false
  })
})
