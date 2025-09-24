// src/features/trips/tripsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip, TripStatus } from "../../types";

interface TripsState {
  items: Trip[];
}

const initialState: TripsState = {
  items: [], // sekarang kosong, akan di-load dari backend
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    // tambah trip
    addTrip: (state, action: PayloadAction<Trip>) => {
      // hindari duplikat
      if (!state.items.find(t => t.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    // update status trip
    updateTripStatus: (
      state,
      action: PayloadAction<{ id: string; status: TripStatus }>
    ) => {
      const trip = state.items.find((t) => t.id === action.payload.id);
      if (trip) {
        trip.status = action.payload.status;
      }
    },
    // mark trip completed
    markTripCompleted: (state, action: PayloadAction<string>) => {
      const trip = state.items.find((t) => t.id === action.payload);
      if (trip) {
        trip.status = "completed";
      }
    },
    // replace semua trips (untuk load awal)
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addTrip,
  updateTripStatus,
  markTripCompleted,
  setTrips,
} = tripsSlice.actions;

export default tripsSlice.reducer;
