import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  //   console.log("session id", sessionId);
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fadeIn">
        <IoBagCheckOutline className="w-20 h-20 text-green-500 mx-auto mb-6 drop-shadow-md" />

        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been received and is now
          being processed.
        </p>

        <Link
          to="/dashboard/my-orders"
          className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
