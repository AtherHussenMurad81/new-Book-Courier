import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    image: "",
    category: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch book data
  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`);
      if (!res.ok) throw new Error("Failed to fetch book");
      const data = await res.json();
      if (data.message) setError(data.message);
      else
        setFormData({
          name: data.name || "",
          author: data.author || "",
          image: data.image || "",
          category: data.category || "",
          price: data.price || "",
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });
      if (!res.ok) throw new Error("Failed to update book");
      toast.success("Book updated successfully");
      navigate("/dashboard/my-book");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-4">Loading book...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "author", "image", "category", "price"].map((field) => (
          <div key={field}>
            <label className="block mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required={field !== "image" && field !== "category"}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {updating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
