// src/pages/Trips.markCompleted.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Trips from './Trips';
import { Provider } from 'react-redux';
import { store } from '../store';

const renderWithProvider = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

test('user can mark a scheduled trip as completed', () => {
  renderWithProvider(<Trips />);

  // Cari tombol Mark Completed pertama
  const markButtons = screen.getAllByText(/Mark Completed/i);
  expect(markButtons.length).toBeGreaterThan(0);

  // Ambil tombol pertama
  const firstButton = markButtons[0];

  // Klik tombol Mark Completed
  fireEvent.click(firstButton);

  // Setelah klik, pastikan text status berubah jadi 'completed'
  // kita cek di DOM apakah masih ada tombol Mark Completed untuk trip itu
  expect(firstButton).not.toBeInTheDocument();
});
