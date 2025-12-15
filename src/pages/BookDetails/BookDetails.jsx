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

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  // console.log(id);
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

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 item-center">
        {/* ---------- LEFT: Book Image ---------- */}
        <div className="w-full">
          <img
            src={book.image}
            alt={book.name}
            className="rounded-xl shadow-xl w-full"
          />
        </div>

        {/* ---------- RIGHT: Book Info ---------- */}
        <div className="flex flex-col gap-4">
          <Heading title={book.name} subtitle={book.author} />

          <p className="text-gray-700 text-lg">Book Status: {book.status}</p>

          <div className="text-xl font-semibold">Price: ${book.price}</div>
          {/* <div className="text-xl font-semibold">
            Quantity Available: {book.quantity}
          </div> */}

          <Button label="Order Now" onClick={openModal} />
        </div>
      </div>

      {/* ---------- ORDER MODAL ---------- */}
      <PurchaseModal
        isOpen={isOpen}
        closeModal={closeModal}
        book={book}
        user={user}
      />
    </Container>
  );
};

export default BookDetails;
