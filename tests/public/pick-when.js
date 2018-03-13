import 'chai/register-should'
import { pickWhen } from '../../index'

suite('pickWhen', () => {
  const inFamily = aContact => aContact.indexOf('@family.net') !== -1,
    pickFamily = pickWhen(inFamily)

  test('map', () => {
    const contacts = new Map([
      ['dad@family.net', 'Dad, Your'],
      ['steve@friends.net', 'Steve, Friend'],
      ['brother@family.net', 'Brother, Your'],
    ])

    const familyContacts = pickFamily(contacts)
    familyContacts.should.deep.equal(
      new Map([
        ['dad@family.net', 'Dad, Your'],
        ['brother@family.net', 'Brother, Your'],
      ])
    )
  })
  test('object', () => {
    const contacts = {
      'dad@family.net': 'Dad, Your',
      'steve@friends.net': 'Steve, Friend',
      'brother@family.net': 'Brother, Your',
    }

    const familyContacts = pickFamily(contacts)
    familyContacts.should.deep.equal({
      'dad@family.net': 'Dad, Your',
      'brother@family.net': 'Brother, Your',
    })
  })
})
