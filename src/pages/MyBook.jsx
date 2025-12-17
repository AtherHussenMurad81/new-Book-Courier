import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const MyBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unpublishingIds, setUnpublishingIds] = useState([]); // track loading for specific books

  const email = user?.email || localStorage.getItem("userEmail");

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/books/user/${email}`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchBooks();
  }, [email]);

  // Handle edit
  const handleEdit = (id) => navigate(`/dashboard/edit-book/${id}`);

  // Handle unpublish with optimistic update
  const handleUnpublish = async (id) => {
    const prevBooks = [...books];
    setBooks((books) =>
      books.map((book) =>
        book._id === id ? { ...book, published: false } : book
      )
    );
    setUnpublishingIds((ids) => [...ids, id]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: false }),
      });
      if (!res.ok) throw new Error("Failed to unpublish book");
      toast.success("Book unpublished successfully");
    } catch (err) {
      setBooks(prevBooks); // rollback on error
      toast.error(err.message || "Failed to unpublish book");
    } finally {
      setUnpublishingIds((ids) => ids.filter((bookId) => bookId !== id));
    }
  };

  if (loading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td className="border border-gray-300 p-2">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-16 h-20 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{book.name}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  {book.published !== false && (
                    <button
                      onClick={() => handleUnpublish(book._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      disabled={unpublishingIds.includes(book._id)}
                    >
                      {unpublishingIds.includes(book._id)
                        ? "Unpublishing..."
                        : "Unpublish"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No books added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBook;
