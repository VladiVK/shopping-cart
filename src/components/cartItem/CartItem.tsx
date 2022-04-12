import React from 'react';
import { decrease, increase } from '../../features/cart/cartSlice';
import { openModal } from '../../features/modal/modalSlice';
import { UIProduct } from '../../features/cart/cartTypes';
import { MinusIcon, PlusIcon, TrashIcon } from '../../icons/icons';
import { useAppDispatch } from '../../store/hooks';

const CartItem = ({ id, title, price, image, quantity }: UIProduct) => {
  const dispatch = useAppDispatch();

  return (
    <article className='cart-item'>
      <img src={image} alt={title} />
      <div className='cart-item__body'>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <div className='cart-item__btns'>
          <button
            className='amount-btn'
            onClick={() => {
              if (quantity <= 1) {
                dispatch(
                  openModal({
                    title: 'remove this product?',
                    buttonText: 'remove',
                    target: 'button',
                    productID: id,
                  })
                );
                return;
              }
              dispatch(decrease(id));
            }}
          >
            <MinusIcon />
          </button>
          <span className='item-quantity'>{quantity}</span>
          <button className='amount-btn' onClick={() => dispatch(increase(id))}>
            {/* <PlusIcon /> */}
            <TrashIcon />
          </button>
        </div>
      </div>
      <button
        className='remove-btn'
        onClick={() => {
          dispatch(
            openModal({
              title: 'remove this product?',
              buttonText: 'remove',
              target: 'button',
              productID: id,
            })
          );
          return;
        }}
      >
        <MinusIcon />
        {/* <TrashIcon /> */}
      </button>
    </article>
  );
};

export default CartItem;
