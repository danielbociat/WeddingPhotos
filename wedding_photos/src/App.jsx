import React, { useState } from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <div className="w-full px-2 py-6 sm:px-4 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-pink-700 text-center mb-6 sm:mb-8 italic">
          Share Your Wedding Memories
        </h1>
        <div className="w-full max-w-screen-lg mx-auto px-2">
          <PhotoUpload onUpload={() => setRefresh(!refresh)} />
          <div className="mt-12">
            <PhotoGallery key={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

