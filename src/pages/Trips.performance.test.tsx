import { render, screen } from '@testing-library/react';
import Trips from './Trips';
import { Provider } from 'react-redux';
import { store } from '../store';

const renderWithProvider = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

test('renders many trips without crashing', () => {
  renderWithProvider(<Trips />);

  // pastikan ada list trip di halaman pertama
  const items = screen.getAllByRole('listitem');
  expect(items.length).toBeGreaterThan(0); // ✅ UI tidak crash

  // kalau kita tahu tiap halaman cuma 10 item:
  // expect(items.length).toBeLessThanOrEqual(10);

  // kalau mau test driver terakhir, tambahkan dulu klik tombol page terakhir
  // fireEvent.click(screen.getByText('100')); // contoh tombol page terakhir
  // expect(screen.getByText(/Driver 999/i)).toBeInTheDocument();
});
