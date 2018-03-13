//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { prepend } from '../../index'

suite('prepend', () => {
  test('array', () => {
    const world = ['world'],
      helloWorld = prepend('hello')(world)

    helloWorld.should.deep.equal(['hello', 'world'])
    helloWorld.should.not.equal(world)
  })
  test('string', () => {
    const hello = ' world'
    prepend('hello')(hello).should.equal('hello world')
  })
})
