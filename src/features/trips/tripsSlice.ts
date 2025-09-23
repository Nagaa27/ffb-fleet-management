import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip, TripStatus } from "../../types";
import { mockTrips } from "../../mock/mockTrips";

interface TripsState {
  items: Trip[];
}

const initialState: TripsState = {
  items: mockTrips,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip: (state, action: PayloadAction<Trip>) => {
      state.items.push(action.payload);
    },
    // 👇 ini action baru untuk ubah status
    updateTripStatus: (state, action: PayloadAction<{ id: string; status: TripStatus }>) => {
      const trip = state.items.find((t) => t.id === action.payload.id);
      if (trip) {
        trip.status = action.payload.status;
      }
    },
  },
});

export const { addTrip, updateTripStatus } = tripsSlice.actions;
export default tripsSlice.reducer;
