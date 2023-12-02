

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

console.log('products', products)

const addDiscount = (items: Product[]) => items.map(item => ({ ...item, price: item.price * 1.1 }))
const twoDecimals = (items: Product[]) => items.map(item => ({ ...item, price: item.price.toFixed(2) }))
const addDeptInfo = (items: Product[]) => items.map(item => ({ ...item, department: depts.filter(d => d.id === item.department)[0] }))


const discountedProducts = compose(addDiscount, twoDecimals, addDeptInfo);


console.log(discountedProducts(products))
