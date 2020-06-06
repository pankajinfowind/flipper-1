export const AppConfig = {
  production: true,
  environment: 'PROD'
};
export const environment = {
  production: true,
  paymentUrl:'https://mighty-hamlet-20200.herokuapp.com/',
  appUrl: 'http://localhost:8000/', // domains when developing should listen on port 8001 so it can be routed propper.
  pusher: {
    key: '3609cb512084f92bbff6',
    cluster: 'ap2',
    forceTLS: true
  },
  config: {
    apiKey: 'AIzaSyCpnbw9i23T0237jgd2ladtPgsGYbmioqA',
    authDomain: 'yegobox-2ee43.firebaseapp.com',
    databaseURL: 'https://yegobox-2ee43.firebaseio.com',
    projectId: 'yegobox-2ee43',
    storageBucket: 'yegobox-2ee43.appspot.com',
  },
  settings:
  {timestampsInSnapshots: true}

};

