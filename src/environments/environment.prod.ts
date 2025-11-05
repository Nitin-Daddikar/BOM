import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://newapi.swastikarts.com/api',
  useDummayApi: true,
  dummyApiUrl: 'https://api.jsonbin.io/v3/b',
};
