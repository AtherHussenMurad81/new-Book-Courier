import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access-token");

  // ---------- FETCH BOOKS ----------
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/manage-books`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ---------- PUBLISH / UNPUBLISH ----------
  const handlePublish = async (id, published) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/book/publish/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ published }),
        }
      );

      if (!res.ok) throw new Error();
      toast.success(published ? "Book Published" : "Book Unpublished");
      fetchBooks();
    } catch {
      toast.error("Action failed");
    }
  };

  // ---------- DELETE BOOK ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book and all its orders?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/book/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();
      toast.success("Book & related orders deleted");
      fetchBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading books...</p>;

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Books</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              {/* <th className="border p-2">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="border p-2">{book.name}</td>
                <td className="border p-2">{book.author}</td>
                <td className="border p-2">${book.price}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handlePublish(book._id, !book.published)}
                    className={`px-3 py-1 text-white rounded ${
                      book.published
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {book.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBook;
