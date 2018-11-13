
export const FLIPPER_CONFIG = {
    assetsPrefix: 'client',
    navbar: {
        defaultPosition: 'drive-navbar',
        dropdownItems: [
            {route: '/drive', name: 'My Box', icon: 'network-drive-custom'},
        ]
    },
    auth: {
        redirectUri: '/redirect',
        adminRedirectUri: '/admin',
        color: 'primary',
    },
    accountSettings: {
        hideNavbar: false,
    },
    customPages: {
        hideNavbar: false,
    },
    admin: {
        hideBilling: false,
        ads: [
            {
                slot: 'ads.filePreview',
                description: 'This ad will appear on shared file preview page.',
            },
            {
                slot: 'ads.drive',
                description: 'This ad will appear on user drive page.',
            },
        ],
        appearance: {
            defaultRoute: 'drive',
            navigationRoutes: [
                's',
                'drive',
            ],
            menus: {
                positions: [
                    'drive-navbar',
                    'drive-sidebar',
                    'homepage-navbar',
                    'admin-navbar'
                ],
                availableRoutes: [
                    'drive/shares',
                    'drive/recent',
                    'drive/starred',
                    'drive/trash',
                ]
            },
        }
    },
};
