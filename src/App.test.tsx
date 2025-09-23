import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'; // impor store kamu

test('renders dashboard without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Sesuaikan assertion-nya
  expect(screen.getByText(/Fleet Dashboard/i)).toBeInTheDocument();
});
