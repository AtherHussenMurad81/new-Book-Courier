import React, { useEffect, useState } from "react";
import axios from "axios";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/invoice`
        );
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading invoices...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-center">No invoices found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Book Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Customer Email</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td className="border px-4 py-2">{inv.transactionId}</td>
                <td className="border px-4 py-2">{inv.bookName}</td>
                <td className="border px-4 py-2">
                  {inv.amount} {inv.currency?.toUpperCase()}
                </td>
                <td className="border px-4 py-2">{inv.customerEmail}</td>
                <td className="border px-4 py-2">{inv.paymentStatus}</td>
                <td className="border px-4 py-2">
                  {new Date(inv.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoice;
