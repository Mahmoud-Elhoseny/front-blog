import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  // Validate file type and size
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!imageFile) {
    throw new Error('No image file provided');
  }

  if (!validTypes.includes(imageFile.type)) {
    throw new Error('Invalid file type. Please upload a JPG, PNG, or WebP image.');
  }

  if (imageFile.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      '/travel/image-upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        // Add timeout and show upload progress
        timeout: 35000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    
    // More specific error messages
    if (error.response) {
      throw new Error(`Server error: ${error.response.data.message || 'Upload failed'}`);
    } else if (error.request) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Error uploading image. Please try again.');
    }
  }
};

export default uploadImage;
