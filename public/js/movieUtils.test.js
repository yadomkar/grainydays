const { formatReleaseDate } = require('./movieUtils');

test('formats release date correctly', () => {
  expect(formatReleaseDate('2020-01-01')).toBe('2020');
  expect(formatReleaseDate('1999-12-31')).toBe('1999');
});
