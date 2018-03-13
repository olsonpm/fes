//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { strictlyEquals } from '../../index'

suite('strictlyEquals', () => {
  test('any', () => {
    strictlyEquals({})({}).should.be.false
    strictlyEquals(1)(0).should.be.false
    strictlyEquals(1)(1).should.be.true
  })
})
