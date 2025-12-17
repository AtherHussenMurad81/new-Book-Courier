import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (!sessionId) return;

    const confirmPayment = async () => {
      try {
        const res = await axios.patch(
          `${
            import.meta.env.VITE_API_URL
          }/dashboard/payment-success?session_id=${sessionId}`
        );

        setPaymentInfo({
          transactionId: res.data.transactionId,
        });
      } catch (err) {
        setError("Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return <p className="text-center mt-20">Verifying payment...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <IoBagCheckOutline className="w-20 h-20 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        {paymentInfo?.transactionId && (
          <p className="text-gray-600 mb-2">
            Transaction ID: <b>{paymentInfo.transactionId}</b>
          </p>
        )}

        {paymentInfo?.trackingId && (
          <p className="text-gray-600 mb-6">
            Tracking ID: <b>{paymentInfo.trackingId}</b>
          </p>
        )}

        <Link
          to="/dashboard/invoice"
          className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700"
        >
          Go to My Invoice
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
