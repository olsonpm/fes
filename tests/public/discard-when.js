import 'chai/register-should'
import { discardWhen } from '../../index'

suite('discardWhen', () => {
  test('arrayLike', () => {
    const isBelow80 = score => {
        return score < 80
      },
      getScores80AndAbove = discardWhen(isBelow80),
      classScores = [92, 78, 89, 68, 80, 90, 75, 95],
      scores80AndAbove = getScores80AndAbove(classScores)

    scores80AndAbove.should.deep.equal([92, 89, 80, 90, 95])
    scores80AndAbove.should.not.equal(classScores)
  })

  test('set', () => {
    const babyBoyNames = new Set(['noah', 'alexander', 'liam', 'william']),
      isALongName = name => {
        return name.length > 5
      },
      removeLong = discardWhen(isALongName),
      reasonableNames = removeLong(babyBoyNames)

    reasonableNames.should.deep.equal(new Set(['noah', 'liam']))
    reasonableNames.should.not.equal(babyBoyNames)
  })

  const temperatureWasBelow80 = temperature => {
    return temperature < 80
  }
  const removeWarmDays = discardWhen(temperatureWasBelow80)

  test('map', () => {
    const dayToTemperature = new Map([
        ['monday', 78],
        ['tuesday', 81],
        ['wednesday', 79],
        ['thursday', 83],
        ['friday', 85],
      ]),
      hotDays = removeWarmDays(dayToTemperature)

    hotDays.should.deep.equal(
      new Map([['tuesday', 81], ['thursday', 83], ['friday', 85]])
    )
    hotDays.should.not.equal(dayToTemperature)
  })
  test('object', () => {
    const dayToTemperature = {
        monday: 78,
        tuesday: 81,
        wednesday: 79,
        thursday: 83,
        friday: 85,
      },
      hotDays = removeWarmDays(dayToTemperature)

    hotDays.should.deep.equal({
      tuesday: 81,
      thursday: 83,
      friday: 85,
    })
    hotDays.should.not.equal(dayToTemperature)
  })
})
