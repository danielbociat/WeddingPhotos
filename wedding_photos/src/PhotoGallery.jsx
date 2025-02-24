import React, { useEffect, useState } from "react";
import { list, getUrl } from 'aws-amplify/storage';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const photoList = await list();
      const photoUrls = await Promise.all(
        photoList.items.map(async (photo) => {
          const url = (await getUrl({ key: photo.key })).url;
          return {
            src: url,
            key: photo.key,
          };
        })
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
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div 
            key={photo.key}
            className="aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img 
              src={photo.src} 
              alt="Wedding moment" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;