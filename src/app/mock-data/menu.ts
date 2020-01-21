import { MenuEntries } from "@enexus/flipper-components";

export class MockMenu {

    static data: MenuEntries = {
        user: {
            id: 1,
            name: 'Ganza respice',
            email: 'respinho2014@gmail.com'
        },
        businesses: [
            {
                id: 1,
                name: 'Progress Pharamcy',
                active: true,
            },
            // {
            // id: 2,
            // name: 'My Shop',
            // active: false,
            // },
            // {
            // id: 3,
            // name: 'Dom',
            // active: false,
            // },
            // {
            // id: 4,
            // name: 'Gy',
            // active: false,
            // }
        ],
        branches: [
            {
                id: 1,
                name: 'Kimironko branch',
                active: true,
            },
            // {
            // id: 2,
            // name: 'Nyamata branch',
            // active: false,
            // },
            // {
            // id: 3,
            // name: 'KCT branch',
            // active: false,
            // },
            // {
            // id: 4,
            // name: 'City center branch',
            // active: false,
            // },
        ],
        menu: [
            {
                id: 1,
                name: 'Analytics',
                icon: 'analytics.svg',
                route: 'admin/analytics',
                active: true,
                isSetting: false,
            },
            {
                id: 2,
                name: 'POS',
                icon: 'inventory.svg',
                route: 'admin/pos',
                active: false,
                isSetting: false,
            },
            // {
            // id: 3,
            // name: 'Inventory Count',
            // icon: 'inventory-count.svg',
            // route: 'inventory-count',
            // active: false,
            // },
            // {
            // id: 4,
            // name: 'Orders',
            // icon: 'order.svg',
            // route: 'order',
            // active: false,
            // },
            {
                id: 5,
                name: 'Settings',
                icon: 'settings.svg',
                route: 'admin/settings',
                active: false,
                isSetting: true,
            }
        ]
    };

}
