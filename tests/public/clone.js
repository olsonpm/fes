import 'chai/register-should'
import { clone } from '../../index'

suite('clone', () => {
  test('arrayLike', () => {
    const myFavoriteNumbers = [14, 23],
      clonedFavoriteNumbers = clone(myFavoriteNumbers)

    clonedFavoriteNumbers.should.deep.equal([14, 23])
    clonedFavoriteNumbers.should.not.equal(myFavoriteNumbers)
  })

  test('map', () => {
    const personToFavoriteGame = new Map([['phil', 'super smash brothers']]),
      clonedPeresonToFavoriteGame = clone(personToFavoriteGame)

    clonedPeresonToFavoriteGame.should.deep.equal(
      new Map([['phil', 'super smash brothers']])
    )
    clonedPeresonToFavoriteGame.should.not.equal(personToFavoriteGame)
  })

  test('object', () => {
    const personToFavoriteGame = {
        phil: 'super smash brothers',
      },
      clonedPeresonToFavoriteGame = clone(personToFavoriteGame)

    clonedPeresonToFavoriteGame.should.deep.equal({
      phil: 'super smash brothers',
    })
    clonedPeresonToFavoriteGame.should.not.equal(personToFavoriteGame)
  })

  test('set', () => {
    const myFavoriteNumbers = new Set([14, 23]),
      clonedFavoriteNumbers = clone(myFavoriteNumbers)

    clonedFavoriteNumbers.should.deep.equal(new Set([14, 23]))
    clonedFavoriteNumbers.should.not.equal(myFavoriteNumbers)
  })

  //
  // TODO: Revisit the below tests.  It was rushed because I'm trying to get
  //   something else done!
  //
  test('arguments', () => {
    const args = returnArguments('a', 'b'),
      clonedArgs = clone(args)

    clonedArgs[0] = 'c'

    const expectedClonedArgs = returnArguments('c', 'b')

    clonedArgs.should.deep.equal(expectedClonedArgs)
    clonedArgs.should.not.equal(args)
  })

  test('buffer', () => {
    const aBuffer = Buffer.alloc(1, 'a'),
      cloneOfABuffer = clone(aBuffer)

    cloneOfABuffer.should.deep.equal(aBuffer)
    cloneOfABuffer.should.not.equal(aBuffer)

    cloneOfABuffer[0] = 0x62 // ascii hex for 'b'
    cloneOfABuffer.should.not.deep.equal(aBuffer)
  })

  test('date', () => {
    const jan1 = new Date()
    jan1.setMonth(0, 1)

    const jan3 = clone(jan1)
    jan3.setDate(3)

    jan3.getYear().should.equal(jan1.getYear())
    jan3.getMonth().should.equal(jan1.getMonth())
    jan3.getDate().should.not.equal(jan1.getDate())
  })

  test('regExp', () => {
    const duckRe = /[a-zA-Z0-9]+/g,
      cloneOfDuckRe = clone(duckRe)

    cloneOfDuckRe.should.deep.equal(duckRe)
    cloneOfDuckRe.should.not.equal(duckRe)

    cloneOfDuckRe.test('duck duck goose')
    cloneOfDuckRe.should.not.deep.equal(duckRe)
  })
})

//
//------------------//
// Helper Functions //
//------------------//

function returnArguments() {
  return arguments
}
