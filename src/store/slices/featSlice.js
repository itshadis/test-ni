import { createSlice } from "@reduxjs/toolkit"

const featSlice = createSlice({
  name: "feat",
  initialState: {
    services: null,
    promos: null,
  },
  reducers: {
    getServices: (state, action) => {
      state.services = action.payload // Set layanan dari payload
    },
    getPromos: (state, action) => {
      state.promos = action.payload // Set promo dari payload
    },
  },
})

export const { getServices, getPromos } = featSlice.actions
export default featSlice.reducer
