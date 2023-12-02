import { Box } from './index';
import { products, Product } from '../data';

describe('box', () => {
    test('should hold data', () => {
        const r1 = Box(products)
        expect(r1.fold((x: Product[]) => x).length).toEqual(9)
    })
    test('should trace', () => {
        const r1 = Box(products).trace();
        expect(r1.fold((x: Product[]) => x).length).toEqual(9)
    })
    test('should map', () => {
        const r1 = Box(products)
            .map((x: Product[]) => x.filter(y => y.expires >= new Date('11/2/2023')))
        expect(r1.fold((x: Product[]) => x).length).toEqual(7)
    })
    test('should inspect', () => {
        const r1 = Box(products);
        r1.inspect()
    })
})
