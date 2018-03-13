import 'chai/register-should'
import { mapKeys } from '../../index'

suite('mapKeys', () => {
  test('map', () => {
    const nameToSchoolAttended = new Map([
        ['Phillip McGraw', 'University of North Texas'],
        ['Perry Cox', 'Johns Hopkins School of Medicine'],
      ]),
      graduate = name => `Dr. ${name}`,
      graduateAll = mapKeys(graduate),
      alumni = graduateAll(nameToSchoolAttended)

    alumni.should.deep.equal(
      new Map([
        ['Dr. Phillip McGraw', 'University of North Texas'],
        ['Dr. Perry Cox', 'Johns Hopkins School of Medicine'],
      ])
    )
  })
  test('object', () => {
    const nameToSchoolAttended = {
        'Phillip McGraw': 'University of North Texas',
        'Perry Cox': 'Johns Hopkins School of Medicine',
      },
      graduate = name => `Dr. ${name}`,
      graduateAll = mapKeys(graduate),
      alumni = graduateAll(nameToSchoolAttended)

    alumni.should.deep.equal({
      'Dr. Phillip McGraw': 'University of North Texas',
      'Dr. Perry Cox': 'Johns Hopkins School of Medicine',
    })
  })
})
