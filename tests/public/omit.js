import 'chai/register-should'
import { omit } from '../../index'

suite('omit', () => {
  const unmarkSpam = omit('isSpam')

  test('map', () => {
    const spamEmail = new Map([
      ['address', 'brother@family.net'],
      ['sent', 'today'],
      ['isSpam', true],
    ])

    const email = unmarkSpam(spamEmail)
    email.should.deep.equal(
      new Map([['address', 'brother@family.net'], ['sent', 'today']])
    )
    // ensure unmarkSpam does not mutate email
    email.should.not.equal(spamEmail)
  })

  test('object', () => {
    const spamEmail = {
      address: 'brother@family.net',
      sent: 'today',
      isSpam: true,
    }

    const email = unmarkSpam(spamEmail)
    email.should.deep.equal({
      address: 'brother@family.net',
      sent: 'today',
    })
    // ensure unmarkSpam does not mutate email
    email.should.not.equal(spamEmail)
  })
})
