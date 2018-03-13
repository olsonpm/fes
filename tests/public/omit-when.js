import 'chai/register-should'
import { omitWhen } from '../../index'

suite('omitWhen', () => {
  const seemsLikeSpam = aContact => {
      return (
        aContact.indexOf('prince') !== -1 || aContact.indexOf('pill') !== -1
      )
    },
    removeSpamContacts = omitWhen(seemsLikeSpam)

  test('map', () => {
    const contacts = new Map([
      ['imaprince@india.save.me', 'Prince, Ima'],
      ['you-need-this-pill@the.pill.store', 'Store, Pill'],
      ['brother@family.net', 'Brother, Your'],
    ])

    const realContacts = removeSpamContacts(contacts)
    realContacts.should.deep.equal(
      new Map([['brother@family.net', 'Brother, Your']])
    )
    realContacts.should.not.equal(contacts)
  })
  test('object', () => {
    const contacts = {
      'imaprince@india.save.me': 'Prince, Ima',
      'you-need-this-pill@the.pill.store': 'Store, Pill',
      'brother@family.net': 'Brother, Your',
    }

    const realContacts = removeSpamContacts(contacts)
    realContacts.should.deep.equal({
      'brother@family.net': 'Brother, Your',
    })
    realContacts.should.not.equal(contacts)
  })
})
