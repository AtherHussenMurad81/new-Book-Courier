import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `http://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  console.log(data?.data?.display_url);
  return data?.data?.display_url;
};

// save and update user

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};
