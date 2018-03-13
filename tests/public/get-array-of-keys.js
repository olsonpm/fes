import 'chai/register-should'
import { getArrayOfKeys } from '../../index'

suite('getArrayOfKeys', () => {
  const expectedPeople = ["'lil' georgey", 'billy', 'sally']

  test('map', () => {
    const personToHeightInFeet = new Map([
      ["'lil' georgey", 3],
      ['billy', 4],
      ['sally', 4],
    ])

    getArrayOfKeys(personToHeightInFeet).should.deep.equal(expectedPeople)
  })

  test('object', () => {
    const personToHeightInFeet = {
      "'lil' georgey": 3,
      billy: 4,
      sally: 4,
    }

    getArrayOfKeys(personToHeightInFeet).should.deep.equal(expectedPeople)
  })
})
