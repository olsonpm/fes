import 'chai/register-should'
import { isLaden } from '../../index'

suite('isLaden', () => {
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
      notThereYet = isLaden

    let stopsLeft = bryantParkToProspectPark,
      calledNTimes = 0

    while (notThereYet(stopsLeft)) {
      calledNTimes += 1
      stopsLeft = goToNextStop(stopsLeft)
    }

    calledNTimes.should.equal(bryantParkToProspectPark.length)
    stopsLeft.should.deep.equal([])
  })
  test('mapOrSet', () => {
    const currentUnoHand = new Set(['wild']),
      layWild = hand => hand.delete('wild'),
      mustKeepPlaying = isLaden

    mustKeepPlaying(currentUnoHand).should.be.true
    layWild(currentUnoHand)
    mustKeepPlaying(currentUnoHand).should.be.false
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
      hasMoreToDo = isLaden

    doMath(homework)
    hasMoreToDo(homework).should.be.true
    doEnglish(homework)
    hasMoreToDo(homework).should.be.false
  })
  test('any', () => {
    isLaden(undefined).should.be.false
  })
})
