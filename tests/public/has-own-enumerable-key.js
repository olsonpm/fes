//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { hasOwnEnumerableKey } from '../../index'

suite('hasKey', () => {
  test('any', () => {
    const groceryItemStatuses = {
        bread: 'have plenty',
        milk: 'need more',
      },
      hasAStatusForMilk = hasOwnEnumerableKey('milk'),
      hasAStatusForChips = hasOwnEnumerableKey('chips')

    hasAStatusForMilk(groceryItemStatuses).should.be.true
    hasAStatusForChips(groceryItemStatuses).should.be.false
  })
})
