import 'chai/register-should'
import { getValueFrom } from '../../index'

suite('getValueFrom', () => {
  test('arrayLike', () => {
    const olympicSoccerTop3Teams = ['Brazil', 'Germany', 'Nigeria'],
      choosePlaceFromTop3OlympicTeams = getValueFrom(olympicSoccerTop3Teams),
      secondPlace = choosePlaceFromTop3OlympicTeams(1)

    secondPlace.should.equal('Germany')
  })

  test('map', () => {
    const groceryItemStatuses = new Map([
        ['bread', 'have plenty'],
        ['milk', 'need more'],
      ]),
      chooseGroceryItemStatus = getValueFrom(groceryItemStatuses),
      milkStatus = chooseGroceryItemStatus('milk')

    milkStatus.should.equal('need more')
  })

  test('object', () => {
    const groceryItemStatuses = {
        bread: 'have plenty',
        milk: 'need more',
      },
      chooseGroceryItemStatus = getValueFrom(groceryItemStatuses),
      milkStatus = chooseGroceryItemStatus('milk')

    milkStatus.should.equal('need more')
  })
})
