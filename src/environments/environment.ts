// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  production: false,
  appVersion: packageInfo.version,
  apiUrl: 'http://127.0.0.1:8000/api',
  useDummayApi: true,
  dummyApiUrl: 'https://api.jsonbin.io/v3/b',
  masterKey : '$2a$10$0m41yridpI82BbvjLJHsIuLb7ynKKA56BYFAMNZmLKQEpz6Z.2.xu',
  accessKey: '$2a$10$zkmj6cy9fsWEasGMgYpUcOWLjqnbe1113J907YeoKWuFecb4DObUm'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
