import 'chai/register-should'
import { alwaysReturn } from '../../index'

suite('alwaysReturn', () => {
  test('any', () => {
    const oneBurgerPlease = alwaysReturn('one burger')

    oneBurgerPlease().should.equal('one burger')
  })
})
