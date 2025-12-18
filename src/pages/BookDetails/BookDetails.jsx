import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  // Fetch single book
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return result.data;
    },
  });
  console.log(book);
  if (isLoading) return <LoadingSpinner />;

  // ---------- LOGIC ----------
  const isPublished = book?.status === "published";
  const canOrder = isPublished;

  const handleWishlist = async () => {
    if (!user?.email) {
      toast.error("You need to login first!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        {
          bookId: book?._id,
          userEmail: user?.email,
          bookImg: book?.image,
          price: book?.price,
          name: book?.name,
        },
        {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken?.()}`, // Firebase token
          },
        }
      );

      if (res.data.success) {
        toast.success("Book added to wishlist!");
      } else {
        toast.error(res.data.message || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container>
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl p-6 md:p-10">
          {/* ---------- LEFT: BOOK IMAGE ---------- */}
          <div className="flex justify-center">
            <img
              src={book?.image}
              alt={book?.name}
              className="w-1/2 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* ---------- RIGHT: BOOK INFO ---------- */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <Heading title={book?.name} subtitle={`by ${book?.author}`} />

              {/* STATUS BADGE */}
              <span
                className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium
                  ${
                    isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {isPublished ? "Available" : "Unpublished"}
              </span>

              {/* CATEGORY */}
              {book?.category && (
                <p className="mt-4 text-gray-600">{book.category}</p>
              )}

              {/* PRICE */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-xl font-semibold">Price</p>
                <h2 className="text-3xl font-bold text-indigo-600">
                  ${book?.price}
                </h2>
              </div>
            </div>

            {/* ---------- BUTTON ---------- */}
            <div className="mt-6">
              <Button
                label={isPublished ? "Order Now" : "Not Published"}
                onClick={() => setIsOpen(true)}
                disabled={!canOrder}
                className={`px-8 py-3 text-lg rounded-xl ${
                  !canOrder ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={handleWishlist}
                label={isPublished ? "Wishlist" : "Not Published"}
                className={`px-8 py-3 text-lg rounded-xl 
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PURCHASE MODAL ---------- */}
      <PurchaseModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        book={book}
        user={user}
      />
    </Container>
  );
};

export default BookDetails;
