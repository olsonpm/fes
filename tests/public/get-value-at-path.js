//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { expect } from 'chai'
import { getValueAtPath } from '../../index'

suite('getValueAtPath', () => {
  test('object', () => {
    const a = {
      b: {
        c: 'c',
      },
    }

    getValueAtPath(['b', 'c'])(a).should.equal('c')
    expect(getValueAtPath(['b', 'd'])(a)).to.be.undefined
    expect(getValueAtPath(['b', 'c', 'd'])(a)).to.be.undefined
  })
})
