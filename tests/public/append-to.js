//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { appendTo } from '../../index'

suite('appendTo', () => {
  test('array', () => {
    const hello = ['hello'],
      helloWorld = appendTo(hello)('world')

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.not.equal(hello)
  })
  test('string', () => {
    const hello = 'hello '
    appendTo(hello)('world').should.equal('hello world')
  })
})
