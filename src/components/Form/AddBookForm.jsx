import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../Utiles";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
const AddBookForm = () => {
  const { user } = useAuth();
  // console.log(user);
  const {
    isPending,
    isError,
    data,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Plant Added Successfully");
      mutationReset();
    },
    onSettled: (data, errors) => {
      if (data) console.log(data);
      if (errors) console.log(errors);
    },
    retry: 3,
  });
  // react hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, author, status, price, image } = data;
    // console.log({ name, author, status, price, image });
    const imageFile = image[0];
    // console.log(imageFile);
    // console.log("user", user);

    try {
      const imageUrl = await imageUpload(imageFile);
      const bookData = {
        image: imageUrl,
        name,
        author,
        status,
        price: Number(price),
        user: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      // console.log(bookData);
      await mutateAsync(bookData);
    } catch (error) {
      console.log(error);
    }
  };
  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        {/* Book Name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="bookName" className="block text-gray-600">
            Book Name
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            name="bookName"
            id="bookName"
            type="text"
            placeholder="Enter book name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Author */}
        <div className="space-y-1 text-sm">
          <label htmlFor="author" className="block text-gray-600">
            Author
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            name="author"
            id="author"
            type="text"
            placeholder="Author name"
            {...register("author", { required: true })}
          />
        </div>

        {/* Status */}
        <div className="space-y-1 text-sm">
          <label htmlFor="status" className="block text-gray-600">
            Status
          </label>
          <select
            required
            className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            name="status"
            id="status"
            {...register("status", { required: true })}
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Price */}
        <div className="space-y-1 text-sm">
          <label htmlFor="price" className="block text-gray-600">
            Price
          </label>
          <input
            className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            name="price"
            id="price"
            type="number"
            placeholder="Book price"
            {...register("price", { required: true })}
          />
        </div>

        {/* Image Upload */}
        <div className="p-4 w-full rounded-lg">
          <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
            <div className="flex flex-col w-max mx-auto text-center">
              <label>
                <input
                  className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  hidden
                  {...register("image", { required: true })}
                />
                <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
                  Upload Image
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 hover:bg-lime-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
