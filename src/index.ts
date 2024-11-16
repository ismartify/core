import CoreClass from '@ismartify/core';
// import DunClass from '@ismartify/dun';
import BenzClass from '@ismartify/benz';
// import UriClass from '@ismartify/uri';





// benz.mixin('abc',(_self:BenzClass)=>{
//    Array.from({length:10},(_,i)=>i).forEach(i=>{
//     _self.set(`abc.${i}`,i);
//    })

//    return _self;
// })
// benz.tap();


// const core = new CoreClass();
// core.set('name', 'Core').tap();


// const dun = new DunClass();
// dun.set('name', 'Dun').tap();

// console.log(BenzGo);

export default { CoreClass };


const benz = new CoreClass();
benz.set('name', 'Benz')
benz.set('empty', '')
benz.set('arrays', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
benz.set('object', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 })
benz.set('function', () => { return 'function' })
benz.set('null', null)
benz.set('undefined', undefined)
benz.set('symbol', Symbol('symbol'))
benz.set('bigint', BigInt(1234567890))
benz.set('class', CoreClass)
benz.set('set', new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
benz.set('map', new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], ['j', 10]]))
benz.set('date', new Date()).tap();


