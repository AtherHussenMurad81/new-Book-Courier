import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useState } from "react";

const Books = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    if (!search_text) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/search?search=${search_text}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) return <LoadingSpinner />;

  const displayedBooks = searchResults.length > 0 ? searchResults : books;

  return (
    <Container>
      {/* Search */}
      <form
        data-aos="fade-down"
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex gap-2 justify-center"
      >
        <input
          name="search"
          type="search"
          placeholder="Search courses..."
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {displayedBooks && displayedBooks.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {displayedBooks.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No books found.</p>
      )}
    </Container>
  );
};

export default Books;
