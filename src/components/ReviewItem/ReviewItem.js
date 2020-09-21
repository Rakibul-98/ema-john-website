import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity,key,price} = props.product;
    return (
        <div className="review-item">
            <h5 className='product-name'>{name} </h5>
            <p>Quantity : {quantity} </p>
            <p><small>Price : {price} </small></p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="btn btn-danger">Remove</button>
        </div>
    );
};

export default ReviewItem;