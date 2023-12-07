import { Maybe } from './index';

describe('maybe', () => {
    test('should hold a value', () => {
        const m = Maybe.just(5);
        expect(m.extract()).toEqual(5)
    })
    test('should hold nothing', () => {
        const n = Maybe.nothing();
        expect(n.isNothing()).toBeTruthy();
    })
    test('should chain', () => {
        const addOne = (x: number) => x + 1;
        const addTwo = (x: number) => x + 2;
        const chained = Maybe.chain(addTwo, addOne)([1, 2, 3])
        expect(chained).toEqual([4, 5, 6])
    })
    test('should map', () => {
        const addOne = (x: number) => x + 1;
        const mapped = Maybe.just([1, 2, 3])
            .map((x: number[]) => x.map(addOne))
        expect(mapped.extract()).toEqual([2, 3, 4])
    })
    test('should flat map', () => {
        const arr = [1, 2, 3]
        const flat = Maybe.just(arr)
            .flatMap();
        expect(flat.extract()).toEqual([1, 2, 3])
    })
    test('should render map with null', () => {
        const nullMapped = Maybe.just(null)
            .map((x: any) => x.map((y: any) => y + 1))

        expect(nullMapped.isNothing()).toBeTruthy()
    })
    test('should flat map with null', () => {
        const nullMapped = Maybe.just(null)
            .flatMap();

        expect(nullMapped.isNothing()).toBeTruthy()
    })
})