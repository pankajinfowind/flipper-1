export function shareLinkSocially(network: string, link: string, name?: string, image?: string) {
    const width  = 575,
        height = 400,
        left   = (window.innerWidth  - width)  / 2,
        top    = (window.innerHeight - height) / 2,
        url    = generateSocialShareUrl(network, link, name, image),
        opts   = 'status=1, scrollbars=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

    window.open(url, 'share', opts);
}

function generateSocialShareUrl(type: string, link: string, name?: string, image?: string) {
    switch (type) {
        case 'facebook':
            return 'https://www.facebook.com/sharer/sharer.php?u=' + link ;
        case 'twitter':
            return 'https://twitter.com/intent/tweet?text=' + link ;
        case 'google-plus':
            return 'https://plus.google.com/share?url=' + link ;
        case 'pinterest':
            return 'https://pinterest.com/pin/create/button/?url=' + link + '&media=' + image;
        case 'tumblr':
            const base = 'https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&posttype=photo&title=&caption=';
            return base + this.mediaItem.name + '&content=' + image + '&url=' + link ;
        case 'blogger':
            return 'https://www.blogger.com/blog_this.pyra?t&u=' + link + '&n=' + name;
    }
}
