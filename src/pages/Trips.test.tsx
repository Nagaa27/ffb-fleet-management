// src/pages/Trips.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Trips from './Trips';
import { Provider } from 'react-redux';
import { store } from '../store';

const renderWithProvider = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

test('user can create a new trip', () => {
  const { container } = renderWithProvider(<Trips />);

  fireEvent.change(screen.getAllByRole('combobox')[0], {
    target: { value: store.getState().vehicles.items[0].id },
  });
  fireEvent.change(screen.getAllByRole('combobox')[1], {
    target: { value: store.getState().drivers.items[0].id },
  });
  fireEvent.change(screen.getAllByRole('combobox')[2], {
    target: { value: store.getState().mills.items[0].id },
  });

  // ambil input type="date" langsung
  const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;
  fireEvent.change(dateInput, { target: { value: '2025-09-23' } });

  fireEvent.click(screen.getByText(/Buat Trip/i));

  expect(screen.getByText(/Daftar Trip/i)).toBeInTheDocument();
});
