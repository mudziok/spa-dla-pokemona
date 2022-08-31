import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupWorker, rest } from 'msw';
import { act } from 'react-dom/test-utils';
import * as r from 'react-router';

import { MockLogin, serverUser } from '../MockTest/mock';

// const mockedNavigator = jest.fn();

// jest.mock('react-router', () => ({
//   ...(jest.requireActual('react-router') as any),
//   useNavigate: () => ({
//     navigate: jest.fn().mockImplementation(() => ({})),
//   }),
// }));

// export const mockFunction = jest.fn();

// jest.mock('react-router', () => ({
//   ...(jest.requireActual('react-router') as any),
//   useNavigate: () => mockFunction,
// }));

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router', () => ({
//   ...jest.requireActual('react-router'),
//   useNavigate: () => mockedUsedNavigate,
// }));
// export const mockFunction = jest.fn();

// jest.mock('react-router', () => ({
//   useNavigate: () => mockFunction,
// }));

describe.only('Login 2', () => {
  beforeAll(() => serverUser.listen());
  afterEach(() => serverUser.resetHandlers());
  afterAll(() => serverUser.close());
  //   beforeEach(() => {
  //     mockedUsedNavigate.mockReset();
  //   });

  it('works', async () => {
    const mockFunction = jest.fn();

    jest.mock('react-router', () => ({
      useNavigate: () => mockFunction,
    }));
    render(<MockLogin />);
    const inputUser = screen.getByPlaceholderText('user') as HTMLInputElement;
    userEvent.type(inputUser, 'przemek@gmail.com');

    const inputPassword = screen.getByPlaceholderText(
      'password'
    ) as HTMLInputElement;
    userEvent.type(inputPassword, '123456');

    const btn = screen.getByRole('button');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    // await act(() => {
    //   userEvent.click(btn);
    // });
    userEvent.click(btn);

    await new Promise(process.nextTick);

    // expect(true).toBeTruthy();
    expect(mockFunction).toBeCalled();
    // eslint-disable-next-line no-restricted-globals
    // await waitFor(() => expect(mockFunction).toBeCalled());
    // expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
