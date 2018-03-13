import 'chai/register-should'
import { getArrayOfValues } from '../../index'

suite('getArrayOfValues', () => {
  const expectedHeights = [3, 4, 4]

  test('map', () => {
    const personToHeightInFeet = new Map([
      ["'lil' georgey", 3],
      ['billy', 4],
      ['sally', 4],
    ])

    getArrayOfValues(personToHeightInFeet).should.deep.equal(expectedHeights)
  })

  test('object', () => {
    const personToHeightInFeet = {
      "'lil' georgey": 3,
      billy: 4,
      sally: 4,
    }

    getArrayOfValues(personToHeightInFeet).should.deep.equal(expectedHeights)
  })
})
