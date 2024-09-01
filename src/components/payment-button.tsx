// components/PaymentButton.tsx

import Script from 'next/script';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
interface PaymentButtonProps {
  name: string;
  email: string;
  phone: string;
  closeModal: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ name, email, phone, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    closeModal();

    // Create an order on your server
    const response = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 3000, currency: 'INR' }) // Replace with your amount and currency
    });

    const order = await response.json();

    if (!order.id) {
      console.error('Order creation failed');
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, // Enter the Key ID generated from the Dashboard
      amount: order.amount,
      currency: order.currency,
      name: 'Eshwari Kriya',
      description: 'Eshwari Kriya',
      order_id: order.id,
      handler: function (response: any) {
        console.log(`Payment ID: ${response.razorpay_payment_id}`);
        console.log(`Order ID: ${response.razorpay_order_id}`);
        console.log(`Signature: ${response.razorpay_signature}`);
        setLoading(false);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#000'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.log(`Code: ${response.error.code}`);
      console.log(`Description: ${response.error.description}`);
      console.log(`Source: ${response.error.source}`);
      console.log(`Step: ${response.error.step}`);
      console.log(`Reason: ${response.error.reason}`);
      console.log(`Order ID: ${response.error.metadata.order_id}`);
      console.log(`Payment ID: ${response.error.metadata.payment_id}`);
      setLoading(false);
    });

    rzp.open();
  };

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="mt-5">
        <Button className="w-full" size="lg" onClick={handlePayment} disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </>
  );
};

export default PaymentButton;
