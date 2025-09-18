import URITemplate from 'urijs/src/URITemplate';
import ISmartifyUri from '@ismartify/uri';


const uriTemplate = new URITemplate('/{username}?id={password}');
const url = uriTemplate.expand({username:'benz',password:'pwd'});




const debug =async ()=>{
    const uri = new ISmartifyUri('https://www.baidu.com:9090?s=hello');
    // uri.run('addQuery','a',1);
    uri.run('addQuery','b',2);
    // uri.run('addQuery','c',3);
    // uri.run('addQuery','d',4);
    // uri.run('addQuery','e',5);
    // uri.run('addQuery','f',6);
    uri.call('username','benz');
    uri.call('password','pwd');
    uri.call('port');
    uri.tap();
}

debug();

console.log((new Function).name);

console.log((function(){}).bind({}).name); // "bound "


let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue) + 1, 0, value);
    return array;
  }})});
  
  console.log(insert(2).into([1, 3]).after(1));


  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }

