import { render, screen } from '@testing-library/react';
import { H1 } from './Typography';
import '@testing-library/jest-dom';
describe('Typography', () => {
  it('h1 renders without crashing', () => {
    render(<H1>Test Headline</H1>);

    const heading = screen.getByRole('heading', {
      name: /Test Headline/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
