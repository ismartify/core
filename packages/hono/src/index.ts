import ISmartifyCore from '@ismartify/core';
import Hono, { Context } from "hono"


// 定义Hono插件
class ISmartifyHono extends ISmartifyCore {
    constructor() {
        super();
        this.set('ismartify.name', 'ISmartifyHono');
        this.set('ismartify.version', '1.0.0');
    }

    setItem(path: string, handler: (c: Context) => Promise<Response>) {
        this.set(`hono.get:${path}`,handler);
    }


    hono(){

    }




}

export default ISmartifyHono;
