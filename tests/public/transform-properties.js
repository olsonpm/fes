import 'chai/register-should'
import { transformProperties } from '../../index'

suite('transformProperties', () => {
  const mask = aString => aString.replace(/[a-zA-Z0-9]/g, 'x')

  test('map', () => {
    const maskSensitiveData = transformProperties(
        new Map([['birthDate', mask], ['ssn', mask]])
      ),
      phil = new Map([
        ['name', 'phil'],
        ['birthDate', '01/01/1988'],
        ['ssn', '123-45-6789'],
      ])

    const maskedPhil = maskSensitiveData(phil)
    maskedPhil.should.deep.equal(
      new Map([
        ['name', 'phil'],
        ['birthDate', 'xx/xx/xxxx'],
        ['ssn', 'xxx-xx-xxxx'],
      ])
    )
  })
  test('object', () => {
    const maskSensitiveData = transformProperties({
        birthDate: mask,
        ssn: mask,
      }),
      phil = {
        name: 'phil',
        birthDate: '01/01/1988',
        ssn: '123-45-6789',
      }

    const maskedPhil = maskSensitiveData(phil)
    maskedPhil.should.deep.equal({
      name: 'phil',
      birthDate: 'xx/xx/xxxx',
      ssn: 'xxx-xx-xxxx',
    })
  })
})
