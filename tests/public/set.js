import 'chai/register-should'
import { set } from '../../index'

suite('set', () => {
  const markSpam = set('isSpam', true)

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
  })
})
