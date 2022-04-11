import React from 'react';
import { useEffect } from 'react';
import CartContainer from './components/cartContainer/CartContainer';
import Modal from './components/modal/Modal';
import Navbar from './components/navbar/Navbar';
import { calcTotal } from './features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const { cartItems, isLoading, error } = useAppSelector((state) => state.cart);
  const { isOpen } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calcTotal());
  }, [cartItems]);

  if (error) {
    return (
      <main className='error'>
        <div className='error-container'>
          <h2 className='error-title'>ups, error:</h2>
          <h2 className='error-title'>{error}</h2>
        </div>
      </main>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      {!isLoading && <Navbar />}
      <CartContainer />
    </main>
  );
}

export default App;
