import React, { useState } from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState("upload");

  const handlePageSwitch = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <div className="w-full px-2 py-6 sm:px-4 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-pink-700 text-center mb-6 sm:mb-8 italic">
          Share Your Wedding Memories
        </h1>
        <div className="flex justify-center mb-4">
          {
            currentPage === "upload" ? (
              <button 
                onClick={() => handlePageSwitch("gallery")} 
                className="bg-pink-500 hover:bg-pink-600 text-white font-serif py-2 px-4 rounded-lg"
              >
                View Gallery
              </button>
            ) : (
              <button 
                onClick={() => handlePageSwitch("upload")} 
                className="bg-pink-500 hover:bg-pink-600 text-white font-serif py-2 px-4 rounded-lg mr-2"
              >
                Back to Upload
              </button>
            )
          }
        </div>
        <div className="w-full max-w-screen-lg mx-auto px-2">
          {currentPage === "upload" ? (
            <PhotoUpload onUpload={() => setRefresh(!refresh)} />
          ) : (
            <PhotoGallery key={refresh} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

