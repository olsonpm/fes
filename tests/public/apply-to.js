//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { applyTo } from '../../index'

suite('applyTo', () => {
  test('function', () => {
    const hello = world => `hello ${world}`

    applyTo(hello)(['world']).should.equal('hello world')
  })
})
