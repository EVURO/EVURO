import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: number;
  name: string;
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoriteItem[],
  reducers: {
    addToFavorites(state, action: PayloadAction<FavoriteItem>) {
      return [...state, action.payload];
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
