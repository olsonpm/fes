import 'chai/register-should'
import { omitAll } from '../../index'

suite('omitAll', () => {
  const removePrivateInfo = omitAll(['ssn', 'birthDate'])

  test('map', () => {
    const phil = new Map([
      ['name', 'phil'],
      ['ssn', '123-45-6789'],
      ['birthDate', '1/01/1988'],
    ])

    const sanitizedPhil = removePrivateInfo(phil)
    sanitizedPhil.should.deep.equal(new Map([['name', 'phil']]))
    // ensure removePrivateInfo doesn't mutate phil
    sanitizedPhil.should.not.equal(phil)
  })
  test('object', () => {
    const phil = {
      name: 'phil',
      ssn: '123-45-6789',
      birthDate: '1/01/1988',
    }

    const sanitizedPhil = removePrivateInfo(phil)
    sanitizedPhil.should.deep.equal({ name: 'phil' })
    // ensure removePrivateInfo doesn't mutate phil
    sanitizedPhil.should.not.equal(phil)
  })
})
