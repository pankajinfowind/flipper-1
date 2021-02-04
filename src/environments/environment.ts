import {name, version} from '../../package.json';
export const environment = {
  name,
  version,
  url: 'http://localhost:8082',
  production: false,
  paymentUrl: 'https://mysterious-depths-19225.herokuapp.com/',
  appUrl: 'http://localhost:8082/',
  pusher: {
    key: 'a5c8bceaeeac6065d8de',
    cluster: 'ap2',
    forceTLS: true,
    encrypted: true,
  },
  config: {
    // https://www.techiediaries.com/angular-firebase/angular-9-8-firestore-database-crud-tutorial/
    apiKey: 'AIzaSyCpnbw9i23T0237jgd2ladtPgsGYbmioqA',
    authDomain: 'yegobox-2ee43.firebaseapp.com',
    databaseURL: 'https://yegobox-2ee43.firebaseio.com',
    projectId: 'yegobox-2ee43',
    storageBucket: 'yegobox-2ee43.appspot.com',
  },
  settings: { timestampsInSnapshots: true },
}
