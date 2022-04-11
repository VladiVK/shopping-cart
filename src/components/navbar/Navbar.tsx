import React from 'react';
import { ChevronLeftIcon, ShoppingCartIcon } from '../../icons/icons';
import { useAppSelector } from '../../store/hooks';

const Navbar = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  return (
    <nav>
      <div className='nav-center'>
        <button className='link-btn'>
          <ChevronLeftIcon />
        </button>

        <h3>shopping cart</h3>
        <div className='nav-container'>
          <ShoppingCartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{totalQuantity}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
