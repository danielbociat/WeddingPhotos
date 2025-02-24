import React, { useState } from "react";
//import { Amplify } from "aws-amplify";
//mport awsExports from "./aws-exports";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";


//Amplify.configure(awsExports);

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-pink-700 text-center mb-6 sm:mb-8 italic">
          Share Your Wedding Memories
        </h1>
        <div className="max-w-3xl mx-auto">
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

