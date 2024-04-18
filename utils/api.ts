import ky from 'ky';

export const backend_api = ky.extend({
  prefixUrl: 'https://api.example.com',
  headers: {
    'x-api-key': 'your-api-key',
  },
});

export const normal_api = ky.extend({});
