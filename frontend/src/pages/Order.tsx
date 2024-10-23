import React from 'react';
import OrderTable from '../components/OrderTable';
import Navigation from '../components/Navigation';

const Order: React.FC = () => {
  return (
    <div>
      <Navigation />
      <OrderTable/>
    </div>
  )
}

export default Order