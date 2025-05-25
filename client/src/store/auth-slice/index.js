import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  // Add these for feedback handling
  error: null,
  message: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (FormData) => {
    //using fetch to send data to the backend
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(FormData),
    // });
    // const data = await response.json();
    // return data;

    //using axios to send data to the backend
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      FormData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (FormData) => {
  //using fetch to send data to the backend
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(FormData),
  // });
  // const data = await response.json();
  // return data;

  //using axios to send data to the backend
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    FormData,
    {
      withCredentials: true,
    }
  );

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  //using axios to send data to the backend
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
      headers: {
        "cache-control": "no-store no-cache must-revalidate proxy-revalidate", //to prevent caching of the response because we are using cookies to store the token and we need to check if the user is authenticated or not
        // Expires : '0' //to prevent caching of the response because caching is not supported in the browser
      },
    }
  );

  return response.data;
});

// Async Thunks
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // state.user = action.payload;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false; //written to check if the user is authenticated or not and returns true only if the user is authenticated
        state.user = action.payload.success ? action.payload.user : null; //written because if the user is authenticated then only we need to send the user data to the redux store
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false; //written to check if the user is authenticated or not and returns true only if the user is authenticated
        state.user = action.payload.success ? action.payload.user : null; //written because if the user is authenticated then only we need to send the user data to the redux store
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; //written to check if the user is authenticated or not and returns true only if the user is authenticated
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.isAuthenticated = false
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.isAuthenticated = false
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
