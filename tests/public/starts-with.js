//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { startsWith } from '../../index'

suite('startsWith', () => {
  test('arrayLike', () => {
    startsWith([1, 2, 3])([1, 2, 3]).should.be.true
    startsWith([1, 2, 4])([1, 2, 3]).should.be.false
  })
  test('string', () => {
    startsWith('123')('123').should.be.true
    startsWith('124')('123').should.be.false
  })
})
