import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  restaurantList: [],
};

export const addNewRestaurant = createAsyncThunk(
  "/restaurants/addNewRestaurant",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllRestaurants = createAsyncThunk(
  "/restaurants/fetchAllRestaurants",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/get`
    );
    return result?.data;
  }
);

export const editRestaurant = createAsyncThunk(
  "/restaurants/editRestaurant",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteRestaurant = createAsyncThunk(
  "/restaurants/deleteRestaurant",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/delete/${id}`
    );
    return result?.data;
  }
);

const AdminRestaurantsSlice = createSlice({
  name: "adminRestaurants",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurantList = action.payload.data;
      })
      .addCase(fetchAllRestaurants.rejected, (state) => {
        state.isLoading = false;
        state.restaurantList = [];
      });
  },
});

export default AdminRestaurantsSlice.reducer;
