// import React, { useState } from 'react';

// function ImageUpload() {
//   const [images, setImages] = useState([null]);

//   const handleImageUpload = async (index) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.onchange = async (event) => {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append('image', file);

//       try {
//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const imagePath = await response.text();
//           const updatedImages = [...images];
//           updatedImages[index] = imagePath;
//           setImages(updatedImages);
//         } else {
//           console.error('Failed to upload image');
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     };

//     input.click();
//   };

//   const handleAddImageButton = () => {
//     setImages([...images, null]);
//   };

//   return (
//     <div>
//       <div>
//         {images.map((image, index) => (
//           <div key={index}>
//             {image ? (
//               <p>Image path: {image}</p>
//             ) : (
//               <button onClick={() => handleImageUpload(index)}>
//                 Upload Image {index + 1}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleAddImageButton}>Add More Images</button>
//     </div>
//   );
// }

// export default ImageUpload;

import React from 'react';

function ImageUpload({ onFileChange }) {
  return (
    <div>
      <input type="file" onChange={onFileChange} multiple />
    </div>
  );
}

export default ImageUpload;