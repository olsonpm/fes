import 'chai/register-should'
import { mSet } from '../../index'

suite('mSet', () => {
  const markSpam = mSet('isSpam', true)

  test('map', () => {
    const email = new Map([
      ['address', 'imaprince@india.save.me'],
      ['sent', 'today'],
    ])

    const spamEmail = markSpam(email)
    spamEmail.should.deep.equal(
      new Map([
        ['address', 'imaprince@india.save.me'],
        ['sent', 'today'],
        ['isSpam', true],
      ])
    )
    // ensure markSpam mutates email
    spamEmail.should.equal(email)
  })

  test('object', () => {
    const email = {
      address: 'imaprince@india.save.me',
      sent: 'today',
    }

    const spamEmail = markSpam(email)
    spamEmail.should.deep.equal({
      address: 'imaprince@india.save.me',
      sent: 'today',
      isSpam: true,
    })
    // ensure markSpam mutates email
    spamEmail.should.equal(email)
  })
})
