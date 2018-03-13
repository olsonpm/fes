import 'chai/register-should'
import { construct } from '../../index'

suite('construct', () => {
  test('array', () => {
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    const createAPerson = construct(Person),
      phil = createAPerson(['phil', 29])

    phil.should.be.an.instanceof(Person)
    phil.should.include({ name: 'phil', age: 29 })
  })
})
