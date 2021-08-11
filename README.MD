# next-abstract-checkbox
> Abstract checkbox for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-abstract-checkbox
```

## apis
| api              | params | description                                  |
| ---------------- | ------ | -------------------------------------------- |
| checked          | -      | Property: Get the list checked status.       |
| indeterminate    | -      | Property: Get the list indeterminate status. |
| ids              | -      | Property: Get the all the list ids.          |
| select           | -      | Method: Select checkbox by id.               |
| selectMultiple   | -      | Method: Select checkbox by id list.          |
| selectAll        | -      | Method: Select all the checkbox.             |
| unSelect         | -      | Method: Deselct checkbox by id.              |
| unSelectMultiple | -      | Method: Deselct checkbox by id list.         |
| unSelectAll      | -      | Method: Deselct all the checkbox.            |
| get              | -      | Method: Get runtime ids list.                |

## usage
```js
import NxAbstractCheckbox from '@jswork/next-abstract-checkbox';

const checkboxer = new NxAbstractCheckbox({ idKey: 'uuid', items:[] });
const res = checkboxer.select(['4c4e97a96dc164db144452acdf993531']);

// ['4c4e97a96dc164db144452acdf993531']
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-abstract-checkbox/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-abstract-checkbox
[version-url]: https://npmjs.org/package/@jswork/next-abstract-checkbox

[license-image]: https://img.shields.io/npm/l/@jswork/next-abstract-checkbox
[license-url]: https://github.com/afeiship/next-abstract-checkbox/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-abstract-checkbox
[size-url]: https://github.com/afeiship/next-abstract-checkbox/blob/master/dist/next-abstract-checkbox.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-abstract-checkbox
[download-url]: https://www.npmjs.com/package/@jswork/next-abstract-checkbox
