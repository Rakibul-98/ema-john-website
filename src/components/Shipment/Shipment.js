import React from 'react';
import { useContext } from 'react';
import {useForm} from 'react-hook-form'
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm() ;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const onSubmit = data => {
            console.log(data)
        };

        console.log(watch("example")); 

        return (
            <form className="ship-form"  onSubmit={handleSubmit(onSubmit)}>
                <h2>Shipping Info</h2>
                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required !!</span>}

                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email Address" />
                {errors.email && <span className="error">Email is required !!</span>}

                <input name="phone" ref={register({ required: true })} placeholder="Your phone Number" />
                {errors.phone && <span className="error">Phone number is required !!</span>}

                <input name="address" ref={register({ required: true })} placeholder="Your address" />
                {errors.address && <span className="error">Address is required !!</span>}

                <input name="country" ref={register({ required: true })} placeholder="Country Name" />
                {errors.country && <span className="error">Country ame is required !!</span>}
                <input className="btn btn-success" type="submit" />
            </form>
  );
};

export default Shipment;