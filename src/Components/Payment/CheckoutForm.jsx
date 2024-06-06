import { useContext, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AuthContext } from "../../Auth/ContextProvider";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";

const CheckoutForm = ({bioDataId}) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const { user } = useContext(AuthContext)
  const price = 5
  const axiosCommon = useAxiosCommon()

  useEffect(() => {
    if (price > 0) {
      axiosCommon.post('/create-payment-intent', { price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [price, axiosCommon])



  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log(clientSecret)
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // console.log('[PaymentMethod]', paymentMethod);
    }

    // confirm payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || '',
          email: user?.email || '',
        },
      }
    })
    if (confirmError) {
      console.log('[confirmError]', confirmError);
    } else {
      // console.log('[paymentIntent]', paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        const payment = {
          email: user?.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          bioDataId:bioDataId,
          status: "pending"
        }

        const res = await axiosCommon.post('/payment', payment)
        console.log("payment i client", res)

        if(res.data.insertedId){
          toast.success("$5 payment successfully")
          Navigator('/')
        }
      }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border-2 px-2 py-4 shadow-xl rounded-xl"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="mt-10 border-2 bg-blue-500 px-5 py-2 text-white font-semibold rounded-xl" type="submit" disabled={!stripe}>
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm