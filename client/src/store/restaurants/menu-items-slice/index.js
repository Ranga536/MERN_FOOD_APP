import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userMenuItemsList: [],
};

export const fetchAllFilteredMenuItems = createAsyncThunk(
  "/restaurants/fetchFilteredMenuItems",
  async ({ id, filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/restaurants/${id}/get?${query}`
    );

    return result?.data;
  }
);

const shopMenuItemSlice = createSlice({
  name: "shoppingMenuItems",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredMenuItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userMenuItemsList = action.payload.data;
      })
      .addCase(fetchAllFilteredMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.userMenuItemsList = [];
      });
  },
});

export default shopMenuItemSlice.reducer;
