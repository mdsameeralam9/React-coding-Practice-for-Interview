import React, { Suspense } from 'react'
import ProductList from './ProductList'

const Layout_UseHook = () => {
  return (
    <div>
        <Suspense fallback={<h1>Loading</h1>}>
           <ProductList />
        </Suspense>
    </div>
  )
}

export default Layout_UseHook