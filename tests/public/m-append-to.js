//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { mAppendTo } from '../../index'

suite('append', () => {
  test('array', () => {
    const hello = ['hello'],
      helloWorld = mAppendTo(hello)('world')

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.equal(hello)
  })
})
