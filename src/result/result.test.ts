import { Ok, Err, isErr, isOk } from './index';

describe('result', () => {
    test("should hold a value", () => {
        expect(Ok(5).unwrap()).toBe(5)
        expect(Ok(5).isOk()).toBeTruthy()
        expect(Ok(5).isErr()).toBeFalsy()
    })
    test('should return Some', () => {
        expect(Ok(5).ok().isSome()).toBeTruthy()
        expect(Ok(5).ok().isNone()).toBeFalsy()
    })
    test('should return None', () => {
        expect(Ok(5).err().isSome()).toBeFalsy();
        expect(Ok(5).err().isNone()).toBeTruthy()
    })
    test('shoudl match', () => {
        expect(Ok(null).match({
            ok: v => v,
            err: () => null
        })).toBe(null)
    })
    test('should map', () => {
        expect(Ok(5).map(x => x * 2).unwrap()).toEqual(10)
    })
    test('should unwarpOr', () => {
        expect(Ok(5).map(x => x * 2).unwrapOr(5)).toEqual(10)

        // @ts-ignore
        expect(Ok(null).map(x => x * 2).unwrapOr(6)).toEqual(6)
    })
    test('should handle unwrapOrElse', () => {
        expect(Ok(5).unwrapOrElse(x => x)).toEqual(5)
    })
    test('should handle isOk and isErr', () => {
        expect(isOk(Ok(5))).toBeTruthy()
        expect(isErr(Ok(5))).toBeFalsy()
    })
    test('should handle unwrapErr', () => {
        const ok = Ok(5)
        let result = ok.unwrap()
        try {
            result = ok.unwrapErr();
        } catch { }
        expect(result).toEqual(5)
    })
    test('should handle orThen', () => {
        expect(Ok(5).andThen(x => Ok(x)).unwrap()).toEqual(5)
    })
    test('should handle orElse', () => {
        expect(Ok(5).orElse(x => Ok(x)).unwrap()).toEqual(5)
    })
    test('should handle mapErr', () => {
        expect(Ok(5).mapErr(x => Ok(null)).unwrap()).toEqual(5)
    })
})

describe('Err', () => {
    test('should handle value', () => {
        expect(Err(5).isErr()).toBeTruthy()
        expect(Err(5).isOk()).toBeFalsy()
    })
    test('should handle ok', () => {
        expect(Err(5).ok().isNone()).toBeTruthy()
        expect(Err(5).ok().isSome()).toBeFalsy()
    })
    test('should handle err', () => {
        expect(Err(5).err().isSome()).toBeTruthy()
        expect(Err(5).err().isNone()).toBeFalsy()
    })
    test('should handle unrapOr', () => {
        expect(Err(5).unwrapOr('could not unwrap')).toBe('could not unwrap')
    })
    test('should handle unwrapOrElse', () => {
        expect(Err('hello').unwrapOrElse(x => x)).toBe('hello')
    })
    test('should handle unwrapErr', () => {
        expect(Err(5).unwrapErr()).toEqual(5)
    })
    test('should handle match', () => {
        expect(Err(5).match({
            ok: x => x,
            err: x => x
        })).toEqual(5)
    })
    test('should handle map', () => {
        expect(Err(5).map(x => x).isErr()).toBeTruthy()
    })
    test('should handle mapErr', () => {
        expect(Err(5).mapErr(x => x).isErr()).toBeTruthy()
    })
    test('should handle unwrap', () => {
        const err = Err(5);
        try {
            err.unwrap()
        } catch (e) {

        }
        expect(err.isErr()).toBeTruthy()
    })
    test("should handle andThen", () => {
        expect(Err(5).andThen(x => Err(5)).isErr()).toBeTruthy();
    })
    test('should handle orElse', () => {
        expect(Err(5).orElse(x => Err(5)).isErr()).toBeTruthy()
    })
})