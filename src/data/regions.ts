export interface Region {
  id: string;
  name: string;
  children?: Region[];
}

export const regionTree: Region[] = [
  {
    id: '1',
    name: 'North America',
    children: [
      {
        id: '1-1',
        name: 'United States',
        children: [
          { id: '1-1-1', name: 'California' },
          { id: '1-1-2', name: 'New York' },
          { id: '1-1-3', name: 'Texas' },
        ],
      },
      {
        id: '1-2',
        name: 'Canada',
        children: [
          { id: '1-2-1', name: 'Ontario' },
          { id: '1-2-2', name: 'British Columbia' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Europe',
    children: [
      {
        id: '2-1',
        name: 'United Kingdom',
        children: [
          { id: '2-1-1', name: 'London' },
          { id: '2-1-2', name: 'Manchester' },
        ],
      },
      {
        id: '2-2',
        name: 'Germany',
        children: [
          { id: '2-2-1', name: 'Berlin' },
          { id: '2-2-2', name: 'Munich' },
        ],
      },
      {
        id: '2-3',
        name: 'France',
        children: [
          { id: '2-3-1', name: 'Paris' },
          { id: '2-3-2', name: 'Lyon' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Asia',
    children: [
      {
        id: '3-1',
        name: 'China',
        children: [
          {
            id: '3-1-1',
            name: 'Beijing',
            children: [
              { id: '3-1-1-1', name: 'Chaoyang District' },
              { id: '3-1-1-2', name: 'Haidian District' },
            ],
          },
          {
            id: '3-1-2',
            name: 'Shanghai',
            children: [
              { id: '3-1-2-1', name: 'Pudong' },
              { id: '3-1-2-2', name: 'Xuhui' },
            ],
          },
        ],
      },
      {
        id: '3-2',
        name: 'Japan',
        children: [
          { id: '3-2-1', name: 'Tokyo' },
          { id: '3-2-2', name: 'Osaka' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Oceania',
    children: [
      {
        id: '4-1',
        name: 'Australia',
        children: [
          { id: '4-1-1', name: 'Sydney' },
          { id: '4-1-2', name: 'Melbourne' },
        ],
      },
    ],
  },
];