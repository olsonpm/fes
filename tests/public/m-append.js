//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { mAppend } from '../../index'

suite('append', () => {
  test('array', () => {
    const hello = ['hello'],
      helloWorld = mAppend('world')(hello)

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.equal(hello)
  })
})
