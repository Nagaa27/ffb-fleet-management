import { store } from '../store';

test('store has 100+ vehicles', () => {
  const vehicles = store.getState().vehicles.items;
  expect(vehicles.length).toBeGreaterThanOrEqual(100); // ✅ minimal 100 vehicles
});
