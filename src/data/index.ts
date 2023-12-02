export interface Product {
    upc: string;
    description: string;
    expires: Date;
    price: number;
    department: number;
}

export interface Department {
    id: number;
    description: string;
}

export const depts: Department[] = [
    {
        id: 1,
        description: 'grocery'
    },
    {
        id: 2,
        description: 'meat'
    },
    {
        id: 3,
        description: 'produce'
    }
]



export const products: Product[] = [
    {
        upc: '123',
        description: 'item 1',
        expires: new Date('11/1/2023'),
        price: 2.99,
        department: 1
    },
    {
        upc: '234',
        description: 'item 2',
        expires: new Date('11/1/2023'),
        price: 3.99,
        department: 1
    },
    {
        upc: '345',
        description: 'item 3',
        expires: new Date('11/15/2023'),
        price: 1.99,
        department: 2
    },
    {
        upc: '456',
        description: 'item 4',
        expires: new Date('11/12/2023'),
        price: 2.99,
        department: 2
    },
    {
        upc: '567',
        description: 'item 5',
        expires: new Date('11/18/2023'),
        price: 2.99,
        department: 2
    },
    {
        upc: '678',
        description: 'item 6',
        expires: new Date('11/2/2023'),
        price: 1.49,
        department: 3
    },
    {
        upc: '789',
        description: 'item 7',
        expires: new Date('11/10/2023'),
        price: 2.99,
        department: 3
    },
    {
        upc: '765',
        description: 'item 8',
        expires: new Date('11/19/2023'),
        price: 4.95,
        department: 3
    },
    {
        upc: '876',
        description: 'item 9',
        expires: new Date('11/10/2023'),
        price: 2.99,
        department: 3
    }
]