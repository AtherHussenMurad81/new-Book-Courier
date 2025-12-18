import { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(wishlist);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError("");

        // Replace with your backend URL
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist`);

        setWishlist(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch wishlist");
      } finally {
        setLoading(false);
      }
    };
    console.log(wishlist);

    fetchWishlist();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (wishlist.length === 0) {
    return <p className="text-center mt-10">Your wishlist is empty.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img className="rounded-xl" src={item.bookImg} alt="" />
            <h3 className="text-lg font-semibold mb-2">
              Email: {item.userEmail}
            </h3>

            <p className="text-gray-600 mb-2">Book Name{item.name}</p>
            <p className="font-bold">price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
