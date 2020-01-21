import {DashBoardEntries} from '@enexus/flipper-components';

export class MockDashboard {
  static data: DashBoardEntries = {
    totalStore: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    grossProfit: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    netProfit: {
      value: '1,024,000',
      percentage: 12,
      since: 'last month'
    },
    soldItems: [{
        id: 1,
        name: 'Mineral Water',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 2,
        name: 'Salt',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 3,
        name: 'Vinegar',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 4,
        name: 'Blueband',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      }
    ],
    sellingBranches: [{
        id: 1,
        name: 'Kimirongo',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 2,
        name: 'Kicukiro',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 3,
        name: 'Nyagatare',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
      {
        id: 4,
        name: 'Gicumbi',
        updatedAt: 'Updated 5m ago',
        items: 100,
        total: 5000
      },
    ]
  };
}
