import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Books = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });
  console.log(books);
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      {books && books?.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {books?.map((book) => (
            <Card key={book._id} book={book}></Card>
          ))}
        </div>
      ) : null}

      {/* <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <Card />
      </div> */}
    </Container>
  );
};

export default Books;
