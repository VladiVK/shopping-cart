import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './modalTypes';

const initialState: ModalState = {
  isOpen: false,
  title: '',
  buttonText: '',
  target: 'cart',
};
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<ModalState>) => {
      state.isOpen = true;
      state.buttonText = payload.buttonText;
      state.title = payload.title;
      state.target = payload.target;
      state.productID = payload.productID;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.productID = undefined;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
