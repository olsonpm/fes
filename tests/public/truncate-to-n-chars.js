//
// TODO: Revisit this test.  It was rushed because I'm trying to get something
//   else done!
//

import 'chai/register-should'
import { truncateToNChars } from '../../index'

suite('truncateToNChars', () => {
  test('string', () => {
    const emailSubjectLine = 'way too long email subject line',
      createSummary = truncateToNChars(20),
      truncatedSubjectLine = createSummary(emailSubjectLine)

    truncatedSubjectLine.should.equal('way too long email s...')
  })
})
