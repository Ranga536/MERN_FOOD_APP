import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminRestaurantsSlice from "./admin/restaurant-slice";
import shopRestaurantSlice from "./restaurants/restaurant-slice";
import adminMenuItemsSlice from "./admin/menu-items-slice";
import shopMenuItemSlice from "./restaurants/menu-items-slice";
import shopCartSlice from "./restaurants/cart-slice";
import shopAddressSlice from "./restaurants/address-slice";
import shopOrderSlice from "./restaurants/order-slice";
import adminOrderSlice from "./admin/order-slice";
import shopSearchSlice from "./restaurants/search-slice";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminRestaurants: adminRestaurantsSlice,
    shopRestaurants: shopRestaurantSlice,
    adminMenuItems: adminMenuItemsSlice,
    adminOrder: adminOrderSlice,
    shopMenuItems: shopMenuItemSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
