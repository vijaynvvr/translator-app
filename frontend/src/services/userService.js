import axios from "axios";

const BASE_API_URL = "http://localhost:5000/";

const upload_data = async (file, option) => {
  let formData = new FormData();
  formData.append("file", file);
  console.log("hello");
  const response = await axios.post(
    BASE_API_URL + "extractText",
    formData,
    // option,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const userService = {
  upload_data,
};

export default userService;
