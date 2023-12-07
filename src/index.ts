

console.log('you are ready to start coding typescript...');

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const main = document.createElement('div');
const child = document.createElement('p');
child.innerHTML = 'Hello';
main.appendChild(child);
root.appendChild(main);

import { compose } from './utils';
import { products, depts } from './data';
import type { Product, Department } from './data';

console.log('******* compose')
// console.log('products', products)

const addDiscount = (items: Product[]) => items.map(item => ({ ...item, price: item.price * 1.1 }))
const twoDecimals = (items: Product[]) => items.map(item => ({ ...item, price: item.price.toFixed(2) }))
const addDeptInfo = (items: Product[]) => items.map(item => ({ ...item, department: depts.filter(d => d.id === item.department)[0] }))
const shortenItemInfo = (items: Product[]) => items.map(item => ({ upc: item.upc, price: item.price }))

const discountedProducts = compose(addDiscount, twoDecimals, addDeptInfo);
console.log(discountedProducts(products))
const shortened = compose(addDiscount, twoDecimals, shortenItemInfo)

interface IShort {
    upc: string;
    price: number;
}
console.log('newarray', (shortened(products) as IShort[]).splice(0, 1))

import { curry } from './utils';

const findProducts = (dept: number) => {
    return (price: number) => {
        return products.filter(p => p.department === dept && p.price < price)
    }
}

const curriedFindProducts = curry(findProducts);

console.log('******* curry')
console.log(curriedFindProducts(2)(3))

const findByDepartment = (d: number) => curriedFindProducts(d);

const findByGrocery = findByDepartment(1)
const findByMeat = findByDepartment(2)
const findGroceryByAmount = (a: number) => findByGrocery(a)
const findMeatByAmount = (a: number) => findByMeat(a)
console.log(findGroceryByAmount(5))
console.log(findMeatByAmount(3))

import { Box } from './box';

const sorter = (a: Product, b: Product) => a.description > b.description ? 1 : a.description < b.description ? -1 : 0

const items = Box(products)
    .map((x: Product[]) => x.filter((y: Product) => y.expires >= new Date('11/15/2023')))
    .map((x: Product[]) => x.map((y: Product) => ({ ...y, department: depts.filter(d => d.id === y.department)[0] })))
    .fold((x: Product[]) => x.sort(sorter));

console.log(items);

// maybe

import { Maybe } from './maybe';

const maybeItems = Maybe.just(products)
    .map((x: Product[]) => x.filter(y => y.expires <= new Date('11/15/2023')))
    .map((x: Product[]) => x.map(y => ({ ...y, department: depts.filter(d => d.id === y.department)[0] })))

console.log(maybeItems.extract())

const addOne = (x: number) => x + 1;
const addTwo = (x: number) => x + 2;
const chained = Maybe.chain(addTwo, addOne)([1, 2, 3])
console.log('chained', chained)

const mapped = Maybe.just([1, 2, 3])
    .map((x: number[]) => x.map(addOne))

console.log('mapped', mapped.extract())


const arr = [1, 2, 3]
const flat = Maybe.just<number[]>(arr)
    .flatMap()

console.log('flat', flat.extract())

import { Right, Left, Either, isLeft, isRight } from './either';

const sqrt = (x: number): Either<null, number> => x === 0
    ? Left(null) : Right(x * x);

const leftAnd = Left(0).leftAndThen(sqrt)
console.log(leftAnd.isLeft())

const l = Left<string, string>('hello1').unwrapLeftOr('hello2')
console.log('LEFT', l)

const lOr = Left<number, number>(5).unwrapLeftOrElse(x => x)
console.log('lOr', lOr);

const r = Right<number, number>(5)
    .mapRight(x => x + 5).unwrap()
console.log('r', r)