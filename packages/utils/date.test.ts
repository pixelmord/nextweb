import { formatDate } from './date';
describe('date', () => {
  it('formats a date', () => {
    expect(formatDate('2020-01-01')).toBe('1. Januar 2020');
  });
});
