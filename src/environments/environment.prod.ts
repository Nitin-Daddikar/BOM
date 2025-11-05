import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://newapi.swastikarts.com/api',
  useDummayApi: true,
  dummyApiUrl: 'https://api.jsonbin.io/v3/b',
  masterKey : '$2a$10$0m41yridpI82BbvjLJHsIuLb7ynKKA56BYFAMNZmLKQEpz6Z.2.xu',
  accessKey: '$2a$10$zkmj6cy9fsWEasGMgYpUcOWLjqnbe1113J907YeoKWuFecb4DObUm'
};
