import {name, version} from'../../package.json';
export const environment = {
  name:name,
  version:version,
  url: 'http://localhost:8082',
  production: true,
  paymentUrl: 'https://mighty-hamlet-20200.herokuapp.com/',
  pusher: {
    key: 'a5c8bceaeeac6065d8de',
    cluster: 'ap2',
    forceTLS: true,
    encrypted: true,
  },
  settings: { timestampsInSnapshots: true },
}
