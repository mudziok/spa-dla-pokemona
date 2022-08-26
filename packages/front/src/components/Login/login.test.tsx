import { render, screen } from '@testing-library/react';
import { Login } from './component';

describe('login test', () => {
  test('is rendered', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeDefined();
  });
});
