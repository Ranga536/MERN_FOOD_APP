import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  menuItemsList: [],
};

export const addNewMenuItem = createAsyncThunk(
  "/restaurants/addNewMenuItem",
  async ({ id, formData }) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${id}/add`,
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

export const fetchAllMenuItems = createAsyncThunk(
  "/restaurants/fetchAllMenuItems",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${id}/get`
    );
    return result?.data;
  }
);

export const editMenuItem = createAsyncThunk(
  "/restaurants/editMenuItem",
  async ({ id, menuId, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${id}/edit/${menuId}`,
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

export const deleteMenuItem = createAsyncThunk(
  "/restaurants/deleteMenuItem",
  async ({ id, menuId }) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${id}/delete/${menuId}`
    );
    return result?.data;
  }
);

const AdminMenuItemsSlice = createSlice({
  name: "adminMenuItems",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenuItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuItemsList = action.payload.data;
      })
      .addCase(fetchAllMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.menuItemsList = [];
      });
  },
});

export default AdminMenuItemsSlice.reducer;
