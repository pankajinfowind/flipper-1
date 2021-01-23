export const AppConfig = {
  production: true,
  environment: 'PROD',
}
export const environment = {
  production: true,
  url: 'http://localhost:8082',
  paymentUrl: 'https://mighty-hamlet-20200.herokuapp.com/',
  appUrl: 'https://flipper.rw/', // domains when developing should listen on port 8001 so it can be routed propper.
  pusher: {
    key: 'a5c8bceaeeac6065d8de',
    cluster: 'ap2',
    forceTLS: true,
  },
  config: {
    apiKey: 'AIzaSyCpnbw9i23T0237jgd2ladtPgsGYbmioqA',
    authDomain: 'yegobox-2ee43.firebaseapp.com',
    databaseURL: 'https://yegobox-2ee43.firebaseio.com',
    projectId: 'yegobox-2ee43',
    storageBucket: 'yegobox-2ee43.appspot.com',
  },
  settings: { timestampsInSnapshots: true },
}
