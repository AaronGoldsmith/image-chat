import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated by AI" />
        </div>
      ) : (
        <p>No image to display yet. Enter a message and submit to generate an image.</p>
      )}
    </div>
  );
};


export default ImageDisplay;
