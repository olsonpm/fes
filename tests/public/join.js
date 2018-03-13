import 'chai/register-should'
import { join } from '../../index'

suite('join', () => {
  const createCommaList = join(', ')

  test('array', () => {
    const groceries = ['bread', 'chips', 'peanut butter']

    createCommaList(groceries).should.equal('bread, chips, peanut butter')
  })
  test('set', () => {
    const groceries = new Set(['bread', 'chips', 'peanut butter'])

    createCommaList(groceries).should.equal('bread, chips, peanut butter')
  })

  //
  // TODO: Revisit this test.  It was rushed because I'm trying to get something
  //   else done!
  //
  test('arguments', () => {
    const groceries = returnArguments('bread', 'chips', 'peanut butter')
    createCommaList(groceries).should.equal('bread, chips, peanut butter')
  })
})

function returnArguments() {
  return arguments
}
