import React, { useCallback, useState } from "react";
import { uploadData } from 'aws-amplify/storage';
import { useDropzone } from "react-dropzone";

const PhotoUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    setProgress(0);

    try {
      // Upload all files in parallel
      await Promise.all(
        acceptedFiles.map(async (file) => {
          await uploadData({
            key: `${Date.now()}-${file.name}`, // Ensure unique filenames
            data: file,
            options: {
              contentType: file.type,
              accessLevel: 'guest'
            }
          }).result;
          // Update progress after each file
          setProgress(prev => prev + (100 / acceptedFiles.length));
        })
      );
      onUpload(); // Refresh the photo gallery
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  });

  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 
          ${isDragActive ? 'border-pink-500 bg-pink-100' : 'border-red-300 bg-pink-50 hover:bg-pink-100'}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div>
            <p className="text-pink-600 font-medium italic mb-2">
              Uploading your precious moments... {Math.round(progress)}%
            </p>
            <div className="w-full h-2 bg-pink-100 rounded-full">
              <div 
                className="h-full bg-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-pink-600 font-medium">
              {isDragActive ? 
                "Drop your photos here..." : 
                "Drag & drop your photos or click to select"
              }
            </p>
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
