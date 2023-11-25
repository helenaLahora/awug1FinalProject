// src/ApiConfig.js
const apiKey = 'c95eef64-9633-411a-b87d-e3c36edccb6c';
const apiUrl = 'https://api.harvardartmuseums.org';

const generateApiUrl = (endpoint, params = {}) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${apiUrl}/${endpoint}?apikey=${apiKey}${queryString ? `&${queryString}` : ''}`;
};

export { generateApiUrl };