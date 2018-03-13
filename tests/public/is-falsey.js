import 'chai/register-should'
import { isFalsey } from '../../index'

suite('isFalsey', () => {
  test('any', () => {
    const isSpeechless = speech => isFalsey(speech.length),
      catchPhrase = {
        JasonVorhees: '',
        Fonzie: 'Aaaay',
      }

    isSpeechless(catchPhrase.JasonVorhees).should.be.true
    isSpeechless(catchPhrase.Fonzie).should.be.false
  })
})
