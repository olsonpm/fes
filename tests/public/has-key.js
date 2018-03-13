import 'chai/register-should'
import { hasKey } from '../../index'

suite('hasKey', () => {
  test('arrayLike', () => {
    const hasSecondArgument = hasKey(1)

    function wasASecondArgumentPassed() {
      return hasSecondArgument(arguments)
    }

    wasASecondArgumentPassed('nope').should.be.false
    wasASecondArgumentPassed('first', 'second').should.be.true
  })

  test('map', () => {
    const groceryItemStatuses = new Map([
        ['bread', 'have plenty'],
        ['milk', 'need more'],
      ]),
      hasAStatusForMilk = hasKey('milk'),
      hasAStatusForChips = hasKey('chips')

    hasAStatusForMilk(groceryItemStatuses).should.be.true
    hasAStatusForChips(groceryItemStatuses).should.be.false
  })

  test('object', () => {
    const groceryItemStatuses = {
        bread: 'have plenty',
        milk: 'need more',
      },
      hasAStatusForMilk = hasKey('milk'),
      hasAStatusForChips = hasKey('chips')

    hasAStatusForMilk(groceryItemStatuses).should.be.true
    hasAStatusForChips(groceryItemStatuses).should.be.false
  })
})
