import 'chai/register-should'
import mapValues from '../../lib/internal/map_object'
import { invoke } from '../../index'

suite('invoke', () => {
  test('function', () => {
    const celebToGetLatestTweet = {
      kimKardashian: () => 'Wow this is amazing! Thank you',
      conanObrien: () => {
        return (
          'Netflix announced it will release over 700 original TV series' +
          ' and movies this year. That explains their new slogan, "Quantity."'
        )
      },
      katyPerry: () => {
        return (
          'Heart Talk by my sister-goddess Cleo Wade is available now.' +
          " Fill your ❤️ like she's filled mine."
        )
      },
    }

    const celebToLatestTweet = mapValues(invoke)(celebToGetLatestTweet)

    celebToLatestTweet.should.deep.equal({
      kimKardashian: 'Wow this is amazing! Thank you',
      conanObrien:
        'Netflix announced it will release over 700 original TV series' +
        ' and movies this year. That explains their new slogan, "Quantity."',
      katyPerry:
        'Heart Talk by my sister-goddess Cleo Wade is available now.' +
        " Fill your ❤️ like she's filled mine.",
    })
  })
})
