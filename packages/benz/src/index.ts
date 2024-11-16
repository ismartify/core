import ISmartifyCore from '@ismartify/core';
class ISmartifyBenz extends ISmartifyCore {
    constructor() {
        super();
        this.set('ismartify.name', 'ISmartifyBenz');
        this.set('ismartify.version', '1.0.0');
    }
}


export default ISmartifyBenz;
