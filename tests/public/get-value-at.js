import 'chai/register-should'
import { getValueAt } from '../../index'

suite('getValueAt', () => {
  test('arrayLike', () => {
    const olympicSoccerTop3Teams = ['Brazil', 'Germany', 'Nigeria'],
      getSecondPlace = getValueAt(1),
      secondPlace = getSecondPlace(olympicSoccerTop3Teams)

    secondPlace.should.equal('Germany')
  })

  test('map', () => {
    const groceryItemStatuses = new Map([
        ['bread', 'have plenty'],
        ['milk', 'need more'],
      ]),
      getMilkStatus = getValueAt('milk'),
      milkStatus = getMilkStatus(groceryItemStatuses)

    milkStatus.should.equal('need more')
  })

  test('object', () => {
    const groceryItemStatuses = {
        bread: 'have plenty',
        milk: 'need more',
      },
      getMilkStatus = getValueAt('milk'),
      milkStatus = getMilkStatus(groceryItemStatuses)

    milkStatus.should.equal('need more')
  })
})
