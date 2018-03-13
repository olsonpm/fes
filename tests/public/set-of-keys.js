//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { setOfKeys } from '../../index'

suite('setOfKeys', () => {
  const expectedPeople = new Set(["'lil' georgey", 'billy', 'sally'])

  test('map', () => {
    const personToHeightInFeet = new Map([
      ["'lil' georgey", 3],
      ['billy', 4],
      ['sally', 4],
    ])

    setOfKeys(personToHeightInFeet).should.deep.equal(expectedPeople)
  })

  test('object', () => {
    const personToHeightInFeet = {
      "'lil' georgey": 3,
      billy: 4,
      sally: 4,
    }

    setOfKeys(personToHeightInFeet).should.deep.equal(expectedPeople)
  })
})
