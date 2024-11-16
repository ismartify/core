import URI from 'urijs';
import ISmartifyCore from '@ismartify/core';
class ISmartifyUri extends ISmartifyCore {
    #uri:URI;
    constructor(url:string) {
        super();
        this.set('ismartify.name', 'ISmartifyUri');
        this.set('ismartify.version', '1.0.0');
        this.set('#raw',new URI(url));
    }

    // 运行方法
    run = (fnName:string,...args:any[])=>{
        const uri = this.get('#raw');
        return uri[fnName](...args);
    }

    // 获取数据
    fetch = async () => {
        const uri = this.get('#raw');
        const result = await fetch(uri.toString());
        return result;
    }

    call = (fnName:string,...args:any[])=>{
        const uri = this.get('#raw');
        if(typeof uri[fnName] !== 'function'){
                throw new Error(`${fnName} is not a function`);
        }
        return uri[fnName](...args);
    }
}

export default ISmartifyUri;

