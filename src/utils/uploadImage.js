import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  // Only verify that it's some type of image file


  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      '/travel/image-upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default uploadImage;
