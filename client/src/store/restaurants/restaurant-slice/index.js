import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  restaurantList: [],
  errorMessage: null,
};

// export const fetchAllFilteredRestaurants = createAsyncThunk(
//   "/restaurants/fetchAllRestaurants",
//   async ({ filterParams, sortParams, latitude, longitude }, { rejectWithValue }) => {
//     try {
//       const query = new URLSearchParams({
//         ...filterParams,
//         sortBy: sortParams,
//         latitude,
//         longitude,
//       });

//       const result = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/shop/restaurants/get?${query}`
//       );

//       return result?.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Failed to fetch restaurants" }
//       );
//     }
//   }
// );

export const fetchAllFilteredRestaurants = createAsyncThunk(
  "/restaurants/fetchAllRestaurants",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/restaurants/get?${query}`
      );

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch restaurants" }
      );
    }
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
        state.errorMessage = null;
      })
      .addCase(fetchAllFilteredRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurantList = action.payload.data || [];
        state.errorMessage = null;
      })
      .addCase(fetchAllFilteredRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.restaurantList = [];
        state.errorMessage = action.payload?.message || "Something went wrong";
        console.error("Restaurant fetch error:", state.errorMessage);
      });
  },
});

export default shopRestaurantSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   restaurantList: [],
// };

// export const fetchAllFilteredRestaurants = createAsyncThunk(
//   "/restaurants/fetchAllRestaurants",
//   async ({filterParams, sortParams}) => {
//     const query = new URLSearchParams({
//       ...filterParams,
//       sortBy : sortParams
//     })
//     const result = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/shop/restaurants/get?${query}`
//     );
//     return result?.data;
//   }
// );

// const shopRestaurantSlice = createSlice({
//   name: "shoppingRestaurants",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllFilteredRestaurants.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllFilteredRestaurants.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.restaurantList = action.payload.data;
//       })
//       .addCase(fetchAllFilteredRestaurants.rejected, (state) => {
//         state.isLoading = false;
//         state.restaurantList = [];
//       });
//   },
// });

// export default shopRestaurantSlice.reducer;
