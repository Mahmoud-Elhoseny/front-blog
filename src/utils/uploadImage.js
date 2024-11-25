import axiosInstance from "./axiosInstance";

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadImage = async (imageFile) => {
  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
    throw new Error('Invalid file type. Please upload an image file (JPEG, PNG, GIF, WebP, SVG, BMP, or TIFF)');
  }

  // Validate file size
  if (imageFile.size > MAX_FILE_SIZE) {
    throw new Error('File size too large. Maximum size is 5MB');
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
