import { Some, None, isSome, isNone } from './index';

describe('Some', () => {
    test('should match a sume', () => {
        const s = Some(5).match({
            some: (x => x),
            none: () => 10
        })
        expect(s).toEqual(5)
    })
    test('should match a none', () => {
        const s = Some(null).match({
            some: (x => x),
            none: () => 10
        })
        expect(s).toEqual(10)
    })
    test('should handle isSome', () => {
        const s = Some(5);
        expect(s.isSome()).toBeTruthy()
        expect(s.isNone()).toBeFalsy();
    })
    test('should handle isNone', () => {
        const s = Some(null);
        expect(s.isNone()).toBeTruthy()
    })
    test('should map', () => {
        const s = Some(5).map(x => x + 1).unwrap();
        expect(s).toEqual(6)
    })
    test('should handle andThen', () => {
        expect(Some(5).andThen(x => Some(x)).unwrap()).toEqual(5)
    })
    test('should match a none', () => {
        const test = Some(null).match({
            some: x => x,
            none: 'error'
        })
        expect(test).toEqual('error')
    })
    test("should map none", () => {
        expect(Some(null).map(x => x).isNone()).toBeTruthy()
    })
    test('should handle unwrap', () => {
        const s = Some(null);
        try {

            s.unwrap()
        } catch {


        }
        expect(s.isNone()).toBeTruthy()
    })
    test('should handle andThen', () => {
        expect(Some(null).andThen(x => Some(null)).isNone()).toBeTruthy()
    })
})

describe('isSome', () => {
    test('should return true', () => {
        const s = Some(5);
        expect(isSome(s)).toBeTruthy();
        expect(isNone(s)).toBeFalsy();
    })
})