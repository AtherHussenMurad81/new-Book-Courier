import { Link } from "react-router";

const Card = ({ book }) => {
  // console.log(book);

  return (
    <Link
      to={`/book/${book._id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={book.image}
            alt={book.name}
          />
        </div>

        <div className="font-semibold text-lg">{book.name}</div>
        <div className="font-semibold text-lg">Author: {book.author}</div>
        <div className="font-semibold text-lg">Status: {book.status}</div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">Price: ${book.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
