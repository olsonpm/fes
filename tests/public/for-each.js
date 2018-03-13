//---------//
// Imports //
//---------//

import chai from 'chai'
import chaiThings from 'chai-things'
import 'chai/register-should'
import { forEach } from '../../index'

//
//------//
// Init //
//------//

chai.use(chaiThings)

//
//------//
// Main //
//------//

suite('forEach', () => {
  test('arrayLike', () => {
    const twitterDatabase = [],
      sendTweet = tweet => {
        twitterDatabase.push(tweet)
      },
      sendAll = forEach(sendTweet),
      pendingTweets = [
        "I'm feeling great today",
        'Look at my cute dog! <img href="cutedog.com">',
      ]

    sendAll(pendingTweets)

    twitterDatabase.should.deep.equal([
      "I'm feeling great today",
      'Look at my cute dog! <img href="cutedog.com">',
    ])
  })

  test('set', () => {
    const gmailSpamUserDatabase = new Set(),
      markUserAsSpam = gmailId => {
        gmailSpamUserDatabase.add(gmailId)
      },
      markAll = forEach(markUserAsSpam),
      pendingSpamUsers = new Set([
        'imaprince@india.save.me',
        'you-need-this-pill@the.pill.store',
      ])

    markAll(pendingSpamUsers)

    gmailSpamUserDatabase.should.deep.equal(
      new Set(['imaprince@india.save.me', 'you-need-this-pill@the.pill.store'])
    )
  })

  test('map', () => {
    const groceryListDatabase = new Map(),
      updateStatus = (status, item) => {
        groceryListDatabase.set(item, status)
      },
      updateAllItems = forEach(updateStatus),
      pendingGroceryItemStatuses = new Map([
        ['bread', 'bought'],
        ['milk', 'bought'],
      ])

    updateAllItems(pendingGroceryItemStatuses)

    groceryListDatabase.should.deep.equal(
      new Map([['bread', 'bought'], ['milk', 'bought']])
    )
  })

  test('object', () => {
    const groceryListDatabase = {},
      updateStatus = (status, item) => {
        groceryListDatabase[item] = status
      },
      updateAllItems = forEach(updateStatus),
      pendingGroceryItemStatuses = {
        bread: 'bought',
        milk: 'bought',
      }

    updateAllItems(pendingGroceryItemStatuses)

    groceryListDatabase.should.deep.equal({
      bread: 'bought',
      milk: 'bought',
    })
  })
})
