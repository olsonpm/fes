import 'chai/register-should'
import { truncateToNLines } from '../../index'

suite('truncateToNLines', () => {
  test('string', () => {
    const email = [
        'Hey Bob!',
        'Long time no See!',
        'The rest of this email will be mundane small talk',
        'because I have some time to kill.',
        'Luckily the summary will cut this to four lines',
        "so you'll know not to read it.",
      ].join('\n'),
      createSummary = truncateToNLines(4),
      summary = createSummary(email)

    summary.should.equal(
      [
        'Hey Bob!',
        'Long time no See!',
        'The rest of this email will be mundane small talk',
        'because I have some time to kill.',
        '...',
      ].join('\n')
    )
  })
})
