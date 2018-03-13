//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { appendAll } from '../../index'

suite('appendAll', () => {
  test('array', () => {
    const hello = ['hello'],
      helloWorld = appendAll(['there', 'world'])(hello)

    helloWorld.should.deep.equal(['hello', 'there', 'world'])
    helloWorld.should.not.equal(hello)
  })
})
