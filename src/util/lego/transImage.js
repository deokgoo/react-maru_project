import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const transImage = async (formData) => {
  const url = 'https://deokgoo.pythonanywhere.com/upload';
  const { data } = await axios.post(url, formData);

  return data;
}