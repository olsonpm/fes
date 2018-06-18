//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { applyAt } from '../../index'

suite('apply', () => {
  test('string', () => {
    applyAt('split', ['\n'])('two\nlines').should.deep.equal(['two', 'lines'])
  })

  test('function', () => {
    const hello = {
      there: world => `hello ${world}`,
    }

    applyAt('there', ['world'])(hello).should.equal('hello world')
  })
})
