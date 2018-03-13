import 'chai/register-should'
import { mMap } from '../../index'

suite('mMap', () => {
  const rideFerrisWheel = dollars => dollars - 10,
    allRideTheFerrisWheel = mMap(rideFerrisWheel)

  test('arrayLike', () => {
    const dollarsInFriendsPockets = [20, 30, 25],
      newDollarsInPockets = allRideTheFerrisWheel(dollarsInFriendsPockets)

    newDollarsInPockets.should.deep.equal([10, 20, 15])
    newDollarsInPockets.should.equal(dollarsInFriendsPockets)
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
    newDollarsInPockets.should.equal(dollarsInFriendsPockets)
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
    newDollarsInPockets.should.equal(dollarsInFriendsPockets)
  })
})
