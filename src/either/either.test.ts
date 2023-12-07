import { Right, Left, isLeft, isRight, Either } from './index';
import { products, Product } from '../data';

type Error = {
    message: string;
}

const sqrt = (x: number): Either<null, number> => x === 0
    ? Left(null) : Right(x * x);

describe('either', () => {
    test('should hold data', () => {
        const r1 = Right(products);
        expect(r1.unwrap().length).toEqual(9)
    })
    test('should handle isLeft', () => {
        expect(isLeft(Left(2))).toBe(true);
        expect(isLeft(Left(null))).toBe(true);
        expect(isLeft(Left(undefined))).toBe(true)
    })
    test('should handle isRight', () => {
        expect(isRight(Right(2))).toBe(true);
        expect(isRight(Right(null))).toBe(true);
        expect(isRight(Right(undefined))).toBe(true)
    })

})

describe('left', () => {
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
    test('should handle leftAndThen on Left', () => {
        const l = Left(0).leftAndThen(sqrt).isLeft()
        expect(l).toBeTruthy()
    })
    test('should handle right of Left', () => {
        const l = Left(0).right().isNone()
        expect(l).toBeTruthy()
    })
    test('should handle rightAndThen of Left', () => {
        const l = Left(null).rightAndThen(x => Left(null))
        expect(l.isLeft()).toBeTruthy()
    })
    test('should handle unwrap', () => {
        const l = Left(0).unwrap()
        expect(l).toEqual(0)
    })
    test('should handle unwrapLeft of Left', () => {
        const l = Left(0).unwrapLeft()
        expect(l).toEqual(0)
    })
    test('should handle unwrapLeftOr of Left', () => {
        const l = Left<string, string>('hello1').unwrapLeftOr('hello2')
        expect(l).toEqual('hello1')
    })
    test('should handle unwrapLeftOrElse', () => {
        const lOr = Left<number, number>(5).unwrapLeftOrElse(x => x)
        expect(lOr).toEqual(5)
    })
    test('should handle unwrapRight of Left', () => {
        const r = Left(5)
        let result = r;
        try {
            result = r.unwrapRight();
        } catch (err) {
            expect((err as Error).message).toEqual('Cannot unwrap Right value of Either.Left')
        }
    })
    test('should handle unwrapRightOr on Left', () => {
        const r = Left(5).unwrapRightOr(5)
        expect(r).toEqual(5)
    })
    test('should handle unwrapRightOrElse on Left', () => {
        const r = Left(5).unwrapRightOrElse((x) => x + 1);
        expect(r).toEqual(6)
    })
    test('should handle matchj of left', () => {
        const r = Left(5).match({
            left: x => x + 1,
            right: x => x + 2
        })
        expect(r).toEqual(6)
    })
    test('should handle map of Left', () => {
        const r = Left(5)
            .map(x => x + 1).unwrap();
        expect(r).toEqual(6)
    })
    test('should handle mapLeft of Left', () => {
        const r = Left(5)
            .mapLeft(x => x + 1).unwrap()
        expect(r).toEqual(6)
    })
    test('should handle mapright of Left', () => {
        const r = Left(5)
            .mapRight(x => x).unwrap();
        expect(r).toEqual(5)
    })
})

describe("right", () => {
    test('should handle right', () => {
        const r = Right(5);
        expect(r.isLeft()).toBeFalsy();
        expect(r.isRight()).toBeTruthy();
    })
    test('should handle left of right', () => {
        const r = Right(5);
        try {
            r.left();
        } catch (err) {
            expect(r).toEqual('you are trying to unwrap an option without a value')
        }
    })
    test('should handle leftAndThen of Right', () => {
        const r = Right<number, number>(5).leftAndThen(sqrt).unwrap();
        expect(r).toEqual(5)
    })
    test('should handle right of Right', () => {
        const r = Right<number, number>(5).right().unwrap();
        expect(r).toEqual(5)
    })
    test('should handle righAndThen of Right', () => {
        const r = Right<null, number>(5).rightAndThen(sqrt).unwrap()
        expect(r).toEqual(25)
    })
    test('should handle unwrapLeft of Right', () => {
        const r = Right<null, number>(5)
        try {
            r.unwrapLeft()
        } catch (err) {
            expect((err as Error).message).toEqual('Cannot unwrap Left value of Either.Right')
        }
    })
    test('should handle unwrapLeftOr or Right', () => {
        const r = Right<null, number>(5).unwrapLeftOr(null)
        expect(r).toBeNull()
    })
    test('should handle leftOrElse of Right', () => {
        const r = Right<number, number>(5).unwrapLeftOrElse(x => x)
        expect(r).toEqual(5)
    })
    test('should handle unwrapRight of Right', () => {
        const r = Right<number, number>(5).unwrapRight()
        expect(r).toEqual(5)
    })
    test('should handle rightOr of Right', () => {
        const r = Right<number, number>(5).unwrapRightOr(7)
        expect(r).toEqual(5)
    })
    test('should handle rightOrElse of Right', () => {
        const r = Right<number, number>(5).unwrapRightOrElse(x => x + 1)
        expect(r).toEqual(5)
    })
    test('should handle match of Right', () => {
        const r = Right<number, number>(5).match({
            left: x => x + 2,
            right: x => x + 1
        })
        expect(r).toEqual(6)
    })
    test('should handle map of Right', () => {
        const r = Right<number, number>(5)
            .map(x => x + 5).unwrap()
        expect(r).toEqual(10)
    })
    test('should handle mapLeft or right', () => {
        const r = Right<number, number>(5)
            .mapLeft(x => x + 5).unwrap()
        expect(r).toEqual(5)
    })
    test('should handle mapRight of Right', () => {
        const r = Right<number, number>(5)
            .mapRight(x => x + 5).unwrap()
        expect(r).toEqual(10)
    })
})