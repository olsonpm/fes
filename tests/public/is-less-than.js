//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { isLessThan } from '../../index'

suite('isEmpty', () => {
  test('number', () => {
    isLessThan(2)(1).should.be.true
    isLessThan(1)(1).should.be.false
  })
})
