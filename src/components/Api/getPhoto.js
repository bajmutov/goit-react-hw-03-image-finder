import axios from 'axios';
// axios.defaults.baseURL = 'https://dummyjson.com/';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38604486-c97a7af17c6668551d7e0c5c6';

// export const getPhotoBySearch = async query => {
//   const { data } = await axios(`products/search?q=${query}`);
//   console.log(data);
//   return data;
// };

export const getPhotoBySearch = async query => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  });

  const response = await axios(`${BASE_URL}?${searchParams}`);
  //   console.log(response.data);
  return response.data;
};
