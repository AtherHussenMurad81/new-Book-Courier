import axios from "axios";
import { useNavigate } from "react-router";

const CustomerOrderDataRow = ({ order, refetch }) => {
  const navigate = useNavigate();

  const {
    _id,
    bookId,
    name,
    author,
    image,
    category,
    price,
    quantity,
    status,

    customerPhone,
    paymentStatus,
    customerName,
    customerEmail,
    customerAddress,
    seller,
  } = order;

  // ❌ Cancel Order
  const handleCancel = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${_id}`);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(order);
  // 💳 Pay Now
  const handlePayment = async () => {
    const paymentInfo = {
      bookId: bookId,
      name: name,
      image: image,
      author: author,
      customerEmail: customerEmail,
      customerName: customerName,
      customerPhone: customerPhone,
      paymentStatus: paymentStatus,
      customerAddress: customerAddress,
      seller: seller,
      price: price,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment-checkout-session`,
      paymentInfo
    );
    console.log(res);
    window.location.href = res.data.url;
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <img src={image} alt="" className="w-12 h-12 rounded" />
      </td>

      <td className="px-6 py-4">{name}</td>

      <td className="px-6 py-4">{category}</td>

      <td className="px-6 py-4">${price}</td>

      <td className="px-6 py-4">{quantity}</td>

      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded text-sm font-medium
            ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 space-x-2">
        {status === "pending" && (
          <>
            <button
              onClick={handlePayment}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Pay Now
            </button>

            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
