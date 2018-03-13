import 'chai/register-should'
import { map } from '../../index'

suite('map', () => {
  const rideFerrisWheel = dollars => dollars - 10,
    allRideTheFerrisWheel = map(rideFerrisWheel)

  test('arrayLike', () => {
    const dollarsInFriendsPockets = [20, 30, 25],
      newDollarsInPockets = allRideTheFerrisWheel(dollarsInFriendsPockets)

    newDollarsInPockets.should.deep.equal([10, 20, 15])
    newDollarsInPockets.should.not.equal(dollarsInFriendsPockets)
  })
  test('map', () => {
    const dollarsInFriendsPockets = new Map([
        ['phil', 20],
        ['matt', 30],
        ['chris', 25],
      ]),
      newDollarsInPockets = allRideTheFerrisWheel(dollarsInFriendsPockets)

    newDollarsInPockets.should.deep.equal(
      new Map([['phil', 10], ['matt', 20], ['chris', 15]])
    )
    newDollarsInPockets.should.not.equal(dollarsInFriendsPockets)
  })
  test('object', () => {
    const dollarsInFriendsPockets = {
        phil: 20,
        matt: 30,
        chris: 25,
      },
      newDollarsInPockets = allRideTheFerrisWheel(dollarsInFriendsPockets)

    newDollarsInPockets.should.deep.equal({
      phil: 10,
      matt: 20,
      chris: 15,
    })
    newDollarsInPockets.should.not.equal(dollarsInFriendsPockets)
  })

  test('set', () => {
    const smallCrayonBox = new Set(['yellow', 'blue', 'pink']),
      lighten = color => `light ${color}`,
      lightenAll = map(lighten),
      lightCrayonBox = lightenAll(smallCrayonBox)

    lightCrayonBox.should.deep.equal(
      new Set(['light yellow', 'light blue', 'light pink'])
    )
    lightCrayonBox.should.not.equal(smallCrayonBox)
  })
})
