import React, { useCallback, useState } from "react";
import { uploadData } from 'aws-amplify/storage';
import { useDropzone } from "react-dropzone";

const PhotoUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    const file = acceptedFiles[0]; // Get the first file

    try {
      const result = await uploadData({
        key: file.name,
        data: file,
        options: {
          contentType: file.type,
          accessLevel: 'guest'
        }
      }).result;
      console.log("Uploaded:", result);
      onUpload(); // Refresh the photo gallery
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="p-8 border-2 border-red-300 border-dashed rounded-lg text-center cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors duration-200" 
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-pink-600 font-medium italic">Uploading your precious moment...</p>
        ) : (
          <div>
            <p className="mb-4 text-pink-600 font-medium">Share your special memories</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-serif py-4 px-10 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-red-500 text-lg">
              Upload Your Memories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



export default PhotoUpload;
