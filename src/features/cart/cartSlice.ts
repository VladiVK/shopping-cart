import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  UICartItem,
  UICartState,
  UIProduct,
  UIProductsList,
} from './cartTypes';

const initialState: UICartState = {
  isLoading: false,
  cartItems: [],
  isModal: false,
  error: null,
  totalSum: 0,
  totalQuantity: 0,
};

const cartURL = 'https://fakestoreapi.com/carts/1';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<UIProductsList>(cartURL);
      if (response.status !== 200) {
        throw new Error('Server Error!');
      }

      return await Promise.all(
        response.data.products.map(async (product: UICartItem) => {
          const quantity = product.quantity;
          return axios
            .get<UIProduct>(
              `https://fakestoreapi.com/products/${product.productId}`
            )
            .then((res) => ({ ...res.data, quantity }));
        })
      );
    } catch (error) {
      let errMessage;
      if (error instanceof Error) errMessage = error.message;
      else errMessage = String(error);
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeProduct: (state, { payload }: PayloadAction<number | undefined>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    increase: (state, { payload }: PayloadAction<number>) => {
      const targetProduct = state.cartItems.find((item) => item.id === payload);
      if (targetProduct) targetProduct.quantity += 1;
    },
    decrease: (state, { payload }: PayloadAction<number>) => {
      const targetProduct = state.cartItems.find((item) => item.id === payload);
      if (targetProduct) targetProduct.quantity -= 1;
    },
    calcTotal: (state) => {
      let totalQuantity = 0;
      let totalSum = 0;

      state.cartItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalSum += item.price * item.quantity;
      });

      state.totalQuantity = totalQuantity;
      state.totalSum = totalSum;
    },
  },
  extraReducers: {
    [fetchCart.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCart.fulfilled.type]: (
      state,
      { payload }: PayloadAction<UIProduct[]>
    ) => {
      state.isLoading = false;
      state.cartItems = payload;
    },
    [fetchCart.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { clearCart, decrease, increase, removeProduct, calcTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
