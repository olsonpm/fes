import 'chai/register-should'
import { keepWhen } from '../../index'

suite('keepWhen', () => {
  test('arrayLike', () => {
    const isNinetyAndAbove = score => {
        return score >= 90
      },
      getScoresNinetyAndAbove = keepWhen(isNinetyAndAbove),
      classScores = [92, 78, 89, 68, 80, 90, 75, 95],
      scoresNinetyAndAbove = getScoresNinetyAndAbove(classScores)

    scoresNinetyAndAbove.should.deep.equal([92, 90, 95])
    scoresNinetyAndAbove.should.not.equal(classScores)
  })

  test('set', () => {
    const babyBoyNames = new Set(['noah', 'alexander', 'liam', 'william']),
      isAShortName = name => {
        return name.length <= 4
      },
      keepShort = keepWhen(isAShortName),
      reasonableNames = keepShort(babyBoyNames)

    reasonableNames.should.deep.equal(new Set(['noah', 'liam']))
    reasonableNames.should.not.equal(babyBoyNames)
  })

  const temperatureWas80OrAbove = temperature => {
    return temperature >= 80
  }
  const keepHotDays = keepWhen(temperatureWas80OrAbove)

  test('map', () => {
    const dayToTemperature = new Map([
        ['monday', 78],
        ['tuesday', 81],
        ['wednesday', 79],
        ['thursday', 83],
        ['friday', 85],
      ]),
      hotDays = keepHotDays(dayToTemperature)

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
      hotDays = keepHotDays(dayToTemperature)

    hotDays.should.deep.equal({
      tuesday: 81,
      thursday: 83,
      friday: 85,
    })
    hotDays.should.not.equal(dayToTemperature)
  })
})
