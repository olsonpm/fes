//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { coerceTo } from '../../index'

suite('coerceTo', () => {
  test('boolean', () => {
    coerceTo(Boolean)('a').should.be.true
    coerceTo(Boolean)('').should.be.false
    coerceTo(Array)(['a']).should.deep.equal(['a'])
    coerceTo(Number)(1).should.equal(1)
  })
})
