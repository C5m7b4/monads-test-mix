import { Right, Left, isLeft, isRight } from './index';
import { products, Product } from '../data';

describe('either', () => {
    test('should hold data', () => {
        const r1 = Right(products);
        expect(r1.unwrap().length).toEqual(9)
    })
    test('should handl isLeft', () => {
        expect(isLeft(Left(2))).toBe(true);
        expect(isLeft(Left(null))).toBe(true);
        expect(isLeft(Left(undefined))).toBe(true)
    })
    test('should handle isRight', () => {
        expect(isRight(Right(2))).toBe(true);
        expect(isRight(Right(null))).toBe(true);
        expect(isRight(Right(undefined))).toBe(true)
    })
    test('should handle Left', () => {
        const r1 = Left(null);
        expect(r1.isLeft()).toEqual(true)
    })
    test('should accept left and answer isRight as false', () => {
        const r1 = Left(null);
        expect(r1.isRight()).toBe(false);
    })
    test('should handle .left when left is undefined', () => {
        const r1 = Left(undefined);
        expect(r1.left().isSome()).toBe(false);
        expect(r1.left().isNone()).toBe(true);
    })
})