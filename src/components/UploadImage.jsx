import { useState } from 'react';
import { transImage } from '../util/lego/transImage';

const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', file);
    transImage(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;
