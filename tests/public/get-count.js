import 'chai/register-should'
import { getCount } from '../../index'

suite('getCount', () => {
  test('arrayLike', () => {
    const bryantParkToProspectPark = [
        '42 St - Bryant P',
        '34 Street-Herald Sq Station',
        'West 4 St-Washington Sq Sta',
        'Broadway-Lafayette St',
        'Grand St',
        'DeKalb Avenue Subway Station',
        'Atlantic Av Station',
        '7 Av',
        'Prospect Park Subway Station',
      ],
      getNumberOfSubwayStops = getCount

    getNumberOfSubwayStops(bryantParkToProspectPark).should.equal(9)
  })
  test('mapOrSet', () => {
    const currentHand = new Set(['wild']),
      shouldYellUno = hand => getCount(hand) === 1

    shouldYellUno(currentHand).should.be.true
  })
  test('object', () => {
    const homework = {
        math: 'take-home quiz',
        english: 'read article',
      },
      getNumberOfAssignments = getCount

    getNumberOfAssignments(homework).should.equal(2)
  })
})
