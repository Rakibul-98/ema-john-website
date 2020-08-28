import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const {img,name,seller,price,stock}=props.product
    return (
        <div className='product'>
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div>
                <h1 className="product-name">{name}</h1>
                 <p><small>by : {seller}</small></p>
                 <p>${price}</p>
                 <p>stock left : {stock} Hurry Up!!</p>
                 <button className='main-button' onClick={() => props.handleProduct(props.product)}><FontAwesomeIcon icon={ faShoppingCart } /> Add to Cart</button>
            </div>
            
        </div>
    );
};

export default Product;