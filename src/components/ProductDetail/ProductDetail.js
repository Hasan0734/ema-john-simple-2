import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
    fetch('https://damp-temple-19778.herokuapp.com/product/' + productKey)
    .then(res => res.json())
    .then(data => setProduct(data))
    }, [productKey])
   
    return (
        <div>
            <h1>{productKey} Product Detail comming sooooon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;