//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { apply } from '../../index'

suite('apply', () => {
  test('function', () => {
    const hello = world => `hello ${world}`

    apply(['world'])(hello).should.equal('hello world')
  })
})
