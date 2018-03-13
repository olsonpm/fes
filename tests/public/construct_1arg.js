import 'chai/register-should'
import { construct_1arg } from '../../index'

suite('construct_1arg', () => {
  test('any', () => {
    function Person(name) {
      this.name = name
    }

    const createAPerson = construct_1arg(Person),
      phil = createAPerson('phil')

    phil.should.be.an.instanceof(Person)
    phil.should.have.property('name', 'phil')
  })
})
