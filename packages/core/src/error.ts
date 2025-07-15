//错误定义
interface IErrorItem {
    code: string | number;
    message: string;
    module?: string;
    stack?: string;
    innerErrors?: IErrorItem[];
}


//错误类
export class ISmartifyError extends Error {
    public _IsmartifyError = true; // 标记为 ISmartifyError 实例
    public statusCode: number = 500;  // HTTP 状态码
    public code: string = 'UNKNOWN_ERROR'; // 错误代码
    public module?: string = 'noname'; // 模块或作者
    #reg =  /^(([0-9]*)\.)?([^$@#]+)?(?:#([^@$]+))?(?:@([^$]+))?$/gi; // 解析消息格式: [statusCode.]message[#err.code][@module]

    //构建
    constructor(message = '未知错误') {
        super(message);

        // 格式化消息
        const match = this.#reg.exec(message || '');
        if (match) {
            const [, , statusCodeStr = "500", message = "", errorCode = "UNKNOWN_ERROR", module] = match;
            if (statusCodeStr) this.statusCode = parseInt(statusCodeStr, 10) || 500; // 设置状态码
            if (errorCode) this.code = errorCode;
            if (message) this.message = message; // 设置显示消息
            if (module) this.module = module;     // 设置模块名
        }
    }

    // 获取错误响应项
    throw (){
        throw this;
    }

    // 获取错误JSON
    json(stack: boolean = false) {
        const errorItem: IErrorItem = {
            code: this.code,
            message: this.message,
            module: this.module
        }

        if (stack) errorItem.stack = this.stack || '';
        
        return {
            success: false,
            error: errorItem,
            status: this.statusCode
        }
    }
    
}

// const json = new ISmartifyError("500.服务器错误#INTERNAL_ERROR@bitong").json();
// console.log(json);
