import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  restaurantList: [],
};

export const fetchAllFilteredRestaurants = createAsyncThunk(
  "/restaurants/fetchAllRestaurants",
  async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy : sortParams
    })
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/restaurants/get?${query}`
    );
    return result?.data;
  }
);

const shopRestaurantSlice = createSlice({
  name: "shoppingRestaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredRestaurants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurantList = action.payload.data;
      })
      .addCase(fetchAllFilteredRestaurants.rejected, (state) => {
        state.isLoading = false;
        state.restaurantList = [];
      });
  },
});

export default shopRestaurantSlice.reducer;
