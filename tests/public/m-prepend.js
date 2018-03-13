//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { mPrepend } from '../../index'

suite('prepend', () => {
  test('array', () => {
    const world = ['world'],
      helloWorld = mPrepend('hello')(world)

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.equal(world)
  })
})
