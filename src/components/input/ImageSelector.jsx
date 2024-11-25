import React, { useEffect, useRef, useState } from 'react';
import { FaRegFileImage, FaCamera } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleDeleteImg();
  };

  useEffect(() => {
    if (typeof image === 'string') {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (previewUrl && typeof previewUrl === 'string' && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      
      {!image ? (
        <div className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50">
          <div className="flex gap-4">
            <button
              className="flex flex-col items-center gap-2"
              onClick={() => galleryInputRef.current.click()}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
                <FaRegFileImage className="text-xl text-cyan-500" />
              </div>
              <p className="text-sm text-slate-500">Gallery</p>
            </button>

            <button
              className="flex flex-col items-center gap-2"
              onClick={() => cameraInputRef.current.click()}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
                <FaCamera className="text-xl text-cyan-500" />
              </div>
              <p className="text-sm text-slate-500">Camera</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full relative">
          <img
            src={previewUrl}
            alt="Selected"
            className="w-full h-[300px] object-cover rounded-lg"
          />
          <button
            className="btn-small btn-delete absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
