//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { isGreaterThan } from '../../index'

suite('isEmpty', () => {
  test('number', () => {
    isGreaterThan(1)(2).should.be.true
    isGreaterThan(1)(1).should.be.false
  })
})
