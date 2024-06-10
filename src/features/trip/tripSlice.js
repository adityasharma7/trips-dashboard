import { generateUUID } from "../../utils";
import { tripFilterStatus } from "../../utils/constants";
import { tripsData } from "../../utils/mockData"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: tripsData.data,
    filters: {
        status: tripFilterStatus.DELIVERED
    }
}

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        addTrip: (state, action) => {
            state.list.push({
                tripId: generateUUID(),
                currentStatus: "Booked",
                currentStatusCode: "BKD",
                ...action.payload});
        },
        updateTrip: (state, action) => {
            const index = state.list.findIndex((trip) => {
                return trip.tripId === action.payload.tripId;
            })
            state.list[index] = {...state.list[index], ...action.payload}
        },
        updateTripList: (state, action) => {
            state.list = [ ...action.payload];
        },
        updateTripBulk: (state, action) => {
            action.payload.forEach(updatedTrip => {
                const index = state.list.findIndex(trip => trip.tripId === updatedTrip.tripId);
                if (index !== -1) {
                    state.list[index] = updatedTrip;
                }
            });
        },
        updateFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        }

    }
})


export const { addTrip, updateTrip, updateTripBulk, updateTripList, updateFilters } =  tripSlice.actions
export default tripSlice.reducer;