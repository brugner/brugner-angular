// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  staticUrl: 'https://localhost:5001/',
  apiUrl: 'https://localhost:5001/api/',
  defaultPostThumbnail: '..\\assets\\img\\posts\\default-thumbnail.jpg',
  appInsights: {
    instrumentationKey: 'c53fd695-c2da-4328-8e4f-0796a3e59cbb'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
