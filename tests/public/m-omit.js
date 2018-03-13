import 'chai/register-should'
import { mOmit } from '../../index'

suite('mOmit', () => {
  const unmarkSpam = mOmit('isSpam')

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
    // ensure unmarkSpam mutates email
    email.should.equal(spamEmail)
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
    // ensure unmarkSpam mutates email
    email.should.equal(spamEmail)
  })
})
