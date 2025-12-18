import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PurchaseModal = ({ closeModal, isOpen, book }) => {
  const { user } = useAuth();
  const { name, author, price, image, _id, category } = book || {};
  const axiosSecure = useAxiosSecure();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!phone.trim() || !address.trim()) {
      toast.error("Please fill in phone number and address.");
      return;
    }

    setLoading(true);

    const orderData = {
      bookId: _id,
      price,
      customerName: user?.displayName,
      customerPhone: phone,
      customerAddress: address,
      customerEmail: user?.email,
    };
    // console.log(orderData);
    try {
      await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
        }
      );

      toast.success("Order placed successfully! (Pending Payment)");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full bg-white rounded-xl p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold text-center">
            Complete Your Order
          </DialogTitle>

          <div className="mt-6 space-y-4">
            <div>
              <strong>Book:</strong> {name}
            </div>
            <div>
              <strong>Author:</strong> {author}
            </div>
            <div>
              <strong>Price:</strong> ${price}
            </div>
            <hr />

            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="Name"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number *"
              className="w-full p-2 border rounded"
              required
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery Address *"
              rows="3"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={closeModal}
              disabled={loading}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-70"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
