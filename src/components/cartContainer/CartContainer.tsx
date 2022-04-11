import React from 'react';
import { useEffect } from 'react';

import { fetchCart } from '../../features/cart/cartSlice';
import { openModal } from '../../features/modal/modalSlice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CartItem from '../cartItem/CartItem';

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalQuantity, totalSum, isLoading } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  if (isLoading) {
    return (
      <section className='cart'>
        <h2>loading...</h2>
      </section>
    );
  }

  if (totalQuantity < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <h2>your bag</h2>
      <div className='cart-items__container'>
        {cartItems.map((item: any) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            <span>total {totalQuantity} items</span>{' '}
            <span>$ {totalSum.toFixed(2)}</span>
          </h4>
        </div>
        <div className='cart-clear'>
          <button
            className='btn clear-btn'
            onClick={() =>
              dispatch(
                openModal({
                  title: 'remove all items from your shopping cart?',
                  buttonText: 'clear',
                  target: 'cart',
                })
              )
            }
          >
            clear cart
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
