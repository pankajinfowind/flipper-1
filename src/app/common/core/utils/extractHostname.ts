export function extractHostname(url: string): string {
    let hostname;

    // remove protocol
    if (url.indexOf('//') > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    // remove port
    hostname = hostname.split(':')[0];

    // remove query
    hostname = hostname.split('?')[0];

    return hostname;
}
