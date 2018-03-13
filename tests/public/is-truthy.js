import 'chai/register-should'
import { isTruthy } from '../../index'

suite('isTruthy', () => {
  test('any', () => {
    const canSpeak = speech => isTruthy(speech.length),
      catchPhrase = {
        JasonVorhees: '',
        Fonzie: 'Aaaay',
      }

    canSpeak(catchPhrase.JasonVorhees).should.be.false
    canSpeak(catchPhrase.Fonzie).should.be.true
  })
})
