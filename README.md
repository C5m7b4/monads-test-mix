# monads mix-up

![CircleCI](https://img.shields.io/circleci/build/github/C5m7b4/monads-test-mix/master)

List of Monads available:

- Box
- Maybe
- Either
- Option
- Result
- Try

also supplied

- compose
- curry

## compose

usage:

```js
import { compose } from './utils';
import { products, depts } from './data';
import type { Product, Department } from './data';

console.log('products', products);

const addDiscount = (items: Product[]) =>
  items.map((item) => ({ ...item, price: item.price * 1.1 }));
const twoDecimals = (items: Product[]) =>
  items.map((item) => ({ ...item, price: item.price.toFixed(2) }));
const addDeptInfo = (items: Product[]) =>
  items.map((item) => ({
    ...item,
    department: depts.filter((d) => d.id === item.department)[0]
  }));


const discountedProducts = compose(addDiscount, twoDecimals, addDeptInfo);

console.log('***** compose)
console.log(discountedProducts(products));

```



![compose](img/compose_01.png)

tradionally the compose function reads from right to left, but I really don't like that implementation so this version of cmpose reads from left to right. First we add the discount, then fix the decimals, and then replace the department information with a little more details.

## curry

usage

```js
import { curry } from './utils';

const findProducts = (dept: number) => {
    return (price: number) => {
        return products.filter(p => p.department === dept && p.price < price)
    }
}

const curriedFindProducts = curry(findProducts);

console.log(***** curry)
console.log(curriedFindProducts(2)(3))

const findByDepartment = (d: number) => curriedFindProducts(d);

const findByGrocery = findByDepartment(1)
const findByMeat = findByDepartment(2)
const findGroceryByAmount = (a: number) => findByGrocery(a)
const findMeatByAmount = (a: number) => findByMeat(a)
console.log(findGroceryByAmount(5))
console.log(findMeatByAmount(3))
```

![curry](img/curry.png)

## Box

usage:

```js
import { Box } from './box';

const sorter = (a: Product, b: Product) =>
  a.description > b.description ? 1 : a.description < b.description ? -1 : 0;

const items = Box(products)
  .map((x: Product[]) =>
    x.filter((y: Product) => y.expires >= new Date('11/15/2023'))
  )
  .map((x: Product[]) =>
    x.map((y: Product) => ({
      ...y,
      department: depts.filter((d) => d.id === y.department)[0]
    }))
  )
  .fold((x: Product[]) => x.sort(sorter));

console.log(items);
```

![box](img/box.png)

## maybe

```j2
import { Maybe } from './maybe';

const maybeItems = Maybe.just(products)
    .map((x: Product[]) => x.filter(y => y.expires <= new Date('11/15/2023')))
    .map((x: Product[]) => x.map(y => ({ ...y, department: depts.filter(d => d.id === y.department)[0] })))

console.log(maybeItems.extract())
```

![maybe](img/maybe.png)
