import { useState } from 'react';
import { transImage } from '../util/lego/transImage';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [size, setSize] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', file);
    formData.append('size', size)
    const workId = await transImage(formData);
    setUploadUrl(workId, size);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <input type="text" onChange={handleSizeChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadUrl && <a href={`/react-maru_project/#/user/${uploadUrl}`}>{uploadUrl}</a>}
    </div>
  );
}

export default UploadImage;
