import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albumData = await albumResponse.json();
        setAlbums(albumData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchPhotos = async (albumId) => {
    try {
      const photoResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      const photoData = await photoResponse.json();
      setPhotos(photoData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlbumClick = (album) => {
    setAlbum(album);
    fetchPhotos(album.id);
  };

  const handleClosePopup = () => {
    setAlbum(null);
  };

  return (
      <div>
        <h1 className="header">My Albums</h1>
        <div className="album-grid">
          {albums.map((album) => (
              <div
                  key={album.id}
                  className="album-card"
                  onClick={() => handleAlbumClick(album)}
              >
                {album.title}
              </div>
          ))}
        </div>
        {selectedAlbum && (
            <div className="popup">
              <h2>{selectedAlbum.title}</h2>
              <div className="photo-grid">
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        className="photo"
                        src={photo.url}
                        alt={photo.title}
                    />
                ))}
              </div>
              <button className="close-button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
        )}
      </div>
  );
}

export default App;
