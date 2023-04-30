import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const transImage = (formData) => {
  const url = 'https://deokgoo.pythonanywhere.com/upload';
  axios.post(url, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}