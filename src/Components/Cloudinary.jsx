// src/utils/cloudinary.js
import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/df6bctdlx/upload`, // Replace with your Cloudinary cloud name
    formData
  );

  if (response.status !== 200) {
    throw new Error("Failed to upload file");
  }

  return response.data.secure_url;
};
