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
        description: 'snickers',
        expires: new Date('11/1/2023'),
        price: 2.99,
        department: 1
    },
    {
        upc: '234',
        description: 'candy',
        expires: new Date('11/1/2023'),
        price: 3.99,
        department: 1
    },
    {
        upc: '345',
        description: 'pork chops',
        expires: new Date('11/15/2023'),
        price: 1.99,
        department: 2
    },
    {
        upc: '456',
        description: 'steak',
        expires: new Date('11/12/2023'),
        price: 2.99,
        department: 2
    },
    {
        upc: '567',
        description: 'chicken',
        expires: new Date('11/18/2023'),
        price: 2.99,
        department: 2
    },
    {
        upc: '678',
        description: 'bananas',
        expires: new Date('11/2/2023'),
        price: 1.49,
        department: 3
    },
    {
        upc: '789',
        description: 'apples',
        expires: new Date('11/10/2023'),
        price: 2.99,
        department: 3
    },
    {
        upc: '765',
        description: 'cherries',
        expires: new Date('11/19/2023'),
        price: 4.95,
        department: 3
    },
    {
        upc: '876',
        description: 'avacaco',
        expires: new Date('11/10/2023'),
        price: 2.99,
        department: 3
    }
]