import 'chai/register-should'
import { invokeAt } from '../../index'

suite('invokeAt', () => {
  test('array', () => {
    const top3HotelSearchResults = {
      askForCurrent: {
        price: [() => '180$/night', () => '80$/night', () => '120$/night'],
        vacancy: [() => 'not vacant', () => 'vacant', () => 'vacant'],
      },
    }

    const getTopResultData = invokeAt(0),
      price = getTopResultData(top3HotelSearchResults.askForCurrent.price),
      vacancy = getTopResultData(top3HotelSearchResults.askForCurrent.vacancy)

    price.should.equal('180$/night')
    vacancy.should.equal('not vacant')
  })

  test('map', () => {
    const fetchLatestTweet = new Map([
        ['kim kardashian', () => 'Wow this is amazing! Thank you'],
        ['justin beiber', () => 'Everyone have an amazing week'],
        ['taylor swift', () => 'North American dates on sale now!'],
      ]),
      fetchLatestInstagramPhoto = new Map([
        ['kim kardashian', () => '<on the train>'],
        ['justin beiber', () => '<on the beach>'],
        ['taylor swift', () => '<with ed sheeran>'],
      ])

    const getKimKardashianData = invokeAt('kim kardashian'),
      tweet = getKimKardashianData(fetchLatestTweet),
      photo = getKimKardashianData(fetchLatestInstagramPhoto)

    tweet.should.equal('Wow this is amazing! Thank you')
    photo.should.equal('<on the train>')
  })

  test('object', () => {
    const fetchLatestTweet = {
        kimKardashian: () => 'Wow this is amazing! Thank you',
        justinBeiber: () => 'Everyone have an amazing week',
        taylorSwift: () => 'North American dates on sale now!',
      },
      fetchLatestInstagramPhoto = {
        kimKardashian: () => '<on the train>',
        justinBeiber: () => '<on the beach>',
        taylorSwift: () => '<with ed sheeran>',
      }

    const getKimKardashianData = invokeAt('kimKardashian'),
      tweet = getKimKardashianData(fetchLatestTweet),
      photo = getKimKardashianData(fetchLatestInstagramPhoto)

    tweet.should.equal('Wow this is amazing! Thank you')
    photo.should.equal('<on the train>')
  })
})
