export const AppConfig = {
  production: false,
  environment: 'LOCAL',
}
export const environment = {
  production: false, //TODO: this should be fals in testing for us to bypass the payment remember to make it true otherwise.
  paymentUrl: 'https://mysterious-depths-19225.herokuapp.com/',
  appUrl: 'http://localhost:8000/', // domains when developing should listen on port 8001 so it can be routed propper.

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
