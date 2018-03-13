import 'chai/register-should'
import { reverse } from '../../index'

suite('reverse', () => {
  test('arrayLike', () => {
    const nextTurnsInUno = ['billy', 'sally', 'george']

    const turnsAfterReverseCardLaid = reverse(nextTurnsInUno)
    turnsAfterReverseCardLaid.should.deep.equal(['george', 'sally', 'billy'])
  })
  test('string', () => {
    const isPalindrome = aString => reverse(aString) === aString

    isPalindrome('tacocat').should.be.true
    isPalindrome('not a palindrome').should.be.false
  })
})
