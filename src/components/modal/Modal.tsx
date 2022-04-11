import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal } from '../../features/modal/modalSlice';
import { clearCart, removeProduct } from '../../features/cart/cartSlice';
const Modal = () => {
  const dispatch = useAppDispatch();
  const { title, buttonText, target, productID } = useAppSelector(
    (state) => state.modal
  );
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>{title}</h4>
        <div className='btn-container'>
          <button
            className='btn clear-btn'
            onClick={() => {
              if (target === 'button') {
                dispatch(removeProduct(productID));
                dispatch(closeModal());
              } else {
                dispatch(clearCart());
                dispatch(closeModal());
              }
            }}
          >
            {buttonText}
          </button>
          <button
            className='btn cancel-btn'
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
