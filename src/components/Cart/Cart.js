import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce( (total, prd) => total + prd.price , 0);
    
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total=total+product.price
    // }
    let shipping = 0;

    if (total>15) {
        shipping = 4.99;
    }
    else if(total>0) {
       shipping = 12.99;
    }

    let tax = total/10;

   const formatNumber = num => {
       const precision = num.toFixed(2)
         return Number(precision);
   }
    return (
        <div>
            <h1>Order Summery</h1>
            <h4>Products Ordered : {cart.length} </h4>
            <p><small>Product Price : {formatNumber(total)}</small></p>
            <p><small>Shipping Cost :{shipping} </small></p>
            <p><small>Tax :{formatNumber(tax)} </small></p>
            <p><FontAwesomeIcon icon={ faDollarSign } /> Total : {formatNumber(total+shipping+tax)}</p>
        </div>
    );
};

export default Cart;