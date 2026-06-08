import React from 'react';
import { Provider } from 'react-redux'
import { store } from './Redux/store';
import ProductsList from './ProductsList';

const React_redux_Layout = () => {
  return (
    <Provider store={store}>
        <ProductsList />
    </Provider>
  )
}

export default React_redux_Layout