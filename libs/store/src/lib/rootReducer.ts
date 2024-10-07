import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user/user.slice';
import { UserApi } from './slices/user/user.api';
import cartReducer from './slices/user/cart.slice';
import orderReducer from './slices/user/placeOrder.Slice';
import favoritesReducer from './slices/user/favorite.Slice';
import screenLoaderReducer from './slices/screenLoader/screenLoader.slice';
import { LaunchPadApi } from './slices/launchpad/launchpad.api';
import { ProductApi } from './slices/product/product.api';
import { OrderApi } from './slices/order/order.api';
import { PostsApi } from './slices/posts/posts.api';
import { OnBoardingApi } from './slices/onBoardings/onboardings.api';
import { UsersWithOrdersApi } from './slices/usersWithOrders/usersWithOrders.api';
import { ShortsApi } from './slices/shorts/shorts.api';
import { FavoriteApi } from './slices/favorite/favorite.api';
import { TalentAvailableApi } from './slices/talentAvailable/talentAvailable.api';
import { JobPostsApi } from './slices/jobPosts/jobPosts.api';
import { OrderProductApi } from './slices/orderProduct/orderProduct.api';
import { BillingAddressesApi } from './slices/billingAddresses/billingAddresses.api';
import { AdminDashboardApi } from './slices/dashboard/dashboard.api';

export const RTKReducer = {
  [AdminDashboardApi.reducerPath]: AdminDashboardApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [LaunchPadApi.reducerPath]: LaunchPadApi.reducer,
  [ProductApi.reducerPath]: ProductApi.reducer,
  [OrderApi.reducerPath]: OrderApi.reducer,
  [PostsApi.reducerPath]: PostsApi.reducer,
  [OnBoardingApi.reducerPath]: OnBoardingApi.reducer,
  [UsersWithOrdersApi.reducerPath]: UsersWithOrdersApi.reducer,
  [ShortsApi.reducerPath]: ShortsApi.reducer,
  [FavoriteApi.reducerPath]: FavoriteApi.reducer,
  [TalentAvailableApi.reducerPath]: TalentAvailableApi.reducer,
  [JobPostsApi.reducerPath]: JobPostsApi.reducer,
  [OrderProductApi.reducerPath]: OrderProductApi.reducer,
  [BillingAddressesApi.reducerPath]: BillingAddressesApi.reducer,
};

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  favorite: favoritesReducer,
  screenLoader: screenLoaderReducer,
  ...RTKReducer,
});

export const rootMiddleWare = [
  AdminDashboardApi.middleware,
  UserApi.middleware,
  LaunchPadApi.middleware,
  ProductApi.middleware,
  OrderApi.middleware,
  PostsApi.middleware,
  OnBoardingApi.middleware,
  UsersWithOrdersApi.middleware,
  ShortsApi.middleware,
  FavoriteApi.middleware,
  TalentAvailableApi.middleware,
  JobPostsApi.middleware,
  OrderProductApi.middleware,
  BillingAddressesApi.middleware,
];
