import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const transImage = async (formData) => {
  const url = 'http://127.0.0.1:5000/upload';
  const { data } = await axios.post(url, formData);

  return data;
}