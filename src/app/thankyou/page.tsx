'use client';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Extract and set the query parameters
    if (searchParams) {
      setPaymentId(searchParams?.get('paymentid') || '');
      setOrderId(searchParams?.get('orderId') || '');
    }
  }, [searchParams]);

  return (
    <Suspense>
      <div className="flex lg:w-1/2 shadow-sm justify-center items-center mx-5 lg:mx-auto mt-10 text-center flex-col border rounded-2xl p-4">
        <div className="w-[50px] mb-2 h-[50px] rounded-full border-green-300 bg-green-100 flex justify-center items-center">
          <Check className="text-green-600" />
        </div>
        <h1 className="font-semibold mb-2 text-3xl text-green-600">Thank You!</h1>
        <div className="border border-slate-100 p-2 rounded-xl">
          <p className="text-xs  text-slate-600 font-semibild">
            Payment ID: <span className="text-slate-800 font-semibold">{paymentId}</span>
          </p>
          <p className="text-xs  text-slate-600 font-semibild">
            Order ID: <span className="text-slate-800 font-semibold">{orderId}</span>
          </p>
        </div>
        <p className="my-5 text-sm lg:w-1/2">
          Thank you for your purchase! We`&apos;`ve sent the order details to your email. Please
          check your inbox for confirmation and further instructions.
        </p>
      </div>
    </Suspense>
  );
};

export default ThankYouPage;
