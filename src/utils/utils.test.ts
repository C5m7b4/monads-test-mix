import { curry, compose } from './index';
import { products, Product } from '../data';

interface IShort {
    upc: string;
    price: number;
}

const addDiscount = (items: Product[]) => items.map(item => ({ ...item, price: item.price * 1.1 }))
const twoDecimals = (items: Product[]) => items.map(item => ({ ...item, price: item.price.toFixed(2) }))
const shortenItemInfo = (items: Product[]) => items.map(item => ({ upc: item.upc, price: item.price }))

describe('compose', () => {
    test('should do basic compose', () => {
        const shortened = compose(addDiscount, twoDecimals, shortenItemInfo)
        expect((shortened(products) as IShort[]).splice(0, 1)).toEqual([
            { upc: '123', price: "3.29" }
        ])
    })

})