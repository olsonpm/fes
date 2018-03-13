//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { isEmpty } from '../../index'

suite('isEmpty', () => {
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
      goToNextStop = stops => stops.slice(1),
      reachedDestination = isEmpty

    let stopsLeft = bryantParkToProspectPark,
      calledNTimes = 0

    while (!reachedDestination(stopsLeft)) {
      calledNTimes += 1
      stopsLeft = goToNextStop(stopsLeft)
    }

    calledNTimes.should.equal(bryantParkToProspectPark.length)
    stopsLeft.should.deep.equal([])
  })
  test('mapOrSet', () => {
    const currentUnoHand = new Set(['wild']),
      layWild = hand => hand.delete('wild'),
      donePlaying = isEmpty

    donePlaying(currentUnoHand).should.be.false
    layWild(currentUnoHand)
    donePlaying(currentUnoHand).should.be.true
  })
  test('object', () => {
    const homework = {
        math: 'take-home quiz',
        english: 'read article',
      },
      doMath = homework => {
        delete homework.math
      },
      doEnglish = homework => {
        delete homework.english
      },
      isDoneWith = isEmpty

    doMath(homework)
    isDoneWith(homework).should.be.false
    doEnglish(homework)
    isDoneWith(homework).should.be.true
  })
  test('any', () => {
    isEmpty(undefined).should.be.true
  })
})
