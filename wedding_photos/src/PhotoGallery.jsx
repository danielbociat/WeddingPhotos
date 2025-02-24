import React, { useEffect, useState } from "react";
import { list, getUrl } from 'aws-amplify/storage';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const photoList = await list(); // Get all stored images
      const photoUrls = await Promise.all(
        photoList.items.map(async (photo) => ({
          key: photo.key,
          url: (await getUrl({ key: photo.key })).url,
        }))
      );
      setPhotos(photoUrls);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div key={photo.key} className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img 
            src={photo.url} 
            alt="Wedding moment" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;