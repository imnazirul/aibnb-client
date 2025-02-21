"use client"

import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React, {useEffect, useState} from "react";
import {notification} from "antd";

const PaymentForm = ({publishableKey, clientSecret, onSuccess, onFailed}) => {
    const [stripePromise, setStripePromise] = useState(null)

    useEffect(() => {
        setStripePromise(loadStripe(publishableKey))
    }, [])

    const options = {
        clientSecret: clientSecret,
        appearance: {
            rules: {
                '.Label': {
                    color: 'white',
                    marginBottom: '10px'
                }
            }
        }
    }

    if(!stripePromise) return null

    return (
        <Elements
            stripe={stripePromise}
            options={options}
        >
            <CheckoutForm onSuccess={onSuccess} onFailed={onFailed}/>
        </Elements>
    );
};

export default PaymentForm;


const CheckoutForm = ({onSuccess, onFailed}) => {
    const stripe = useStripe();
    const elements = useElements();
    let [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmPayment({
            redirect: "if_required",
            elements,
        });
        if (result.error) {
            notification.error({
                message: result.error.message
            })
            onFailed()
        } else {
            if(result.paymentIntent.status === 'succeeded') {
                onSuccess()
            } else {
                onFailed()
            }
        }
        setLoading(false)
    };



    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                disabled={loading}
                className="w-full mt-6 bg-pink-600 disabled:opacity-70 text-white py-3 rounded-lg font-bold mb-4 hover:bg-pink-700 transition duration-200">Submit</button>
        </form>
    );
};