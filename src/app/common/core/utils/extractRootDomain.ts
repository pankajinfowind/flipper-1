import { extractHostname } from './extractHostname';

export function extractRootDomain(url: string): string {
    let domain = extractHostname(url);
    const splitArr = domain.split('.');
    const arrLen = splitArr.length;

    // get root domain
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        // see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }

    return domain;
}
