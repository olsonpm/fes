//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { append } from '../../index'

suite('append', () => {
  test('array', () => {
    const hello = ['hello'],
      helloWorld = append('world')(hello)

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.not.equal(hello)
  })
  test('string', () => {
    const hello = 'hello '
    append('world')(hello).should.equal('hello world')
  })
})
