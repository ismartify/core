import { createStorage } from 'unstorage';

// 创建存储实例
const storage = createStorage();

export async function setupOrderTestData() {
    // 基础订单信息
    await storage.setItem("order.id", "ORD20240321001");
    await storage.setItem("order.createTime", "2024-03-21T10:00:00Z");
    await storage.setItem("order.status", "pending");
    await storage.setItem("order.totalAmount", "999.99");
    
    // 客户信息
    await storage.setItem("order.customer.name", "张三");
    await storage.setItem("order.customer.phone", "13800138000");
    await storage.setItem("order.customer.email", "zhangsan@example.com");
    
    // 收货地址
    await storage.setItem("order.shipping.address", "北京市朝阳区某某街道100号");
    await storage.setItem("order.shipping.zipCode", "100000");
    await storage.setItem("order.shipping.receiver", "李四");
    await storage.setItem("order.shipping.contactPhone", "13900139000");
    
    // 订单商品信息
    await storage.setItem("order.items[0].productId", "PROD001");
    await storage.setItem("order.items[0].productName", "iPhone 15");
    await storage.setItem("order.items[0].quantity", "1");
    await storage.setItem("order.items[0].price", "6999.00");
    
    await storage.setItem("order.items[1].productId", "PROD002");
    await storage.setItem("order.items[1].productName", "AirPods Pro");
    await storage.setItem("order.items[1].quantity", "1");
    await storage.setItem("order.items[1].price", "1999.00");
    
    // 支付信息
    await storage.setItem("order.payment.method", "alipay");
    await storage.setItem("order.payment.status", "paid");
    await storage.setItem("order.payment.transactionId", "ALI20240321001");
    await storage.setItem("order.payment.paidTime", "2024-03-21T10:15:00Z");

    // 打印所有订单信息
    console.log('\n=== 订单信息 ===');
    console.log('订单号:', await storage.getItem("order.id"));
    console.log('创建时间:', await storage.getItem("order.createTime"));
    console.log('订单状态:', await storage.getItem("order.status"));
    console.log('订单总额:', await storage.getItem("order.totalAmount"));
    
    console.log('\n=== 客户信息 ===');
    console.log('客户姓名:', await storage.getItem("order.customer.name"));
    console.log('联系电话:', await storage.getItem("order.customer.phone"));
    console.log('电子邮箱:', await storage.getItem("order.customer.email"));
    
    console.log('\n=== 收货信息 ===');
    console.log('收货地址:', await storage.getItem("order.shipping.address"));
    console.log('邮政编码:', await storage.getItem("order.shipping.zipCode"));
    console.log('收货人:', await storage.getItem("order.shipping.receiver"));
    console.log('联系电话:', await storage.getItem("order.shipping.contactPhone"));
    
    console.log('\n=== 商品信息 ===');
    console.log('商品1:', 
        await storage.getItem("order.items[0].productName"),
        'x', await storage.getItem("order.items[0].quantity"),
        '单价:', await storage.getItem("order.items[0].price"));
    console.log('商品2:', 
        await storage.getItem("order.items[1].productName"),
        'x', await storage.getItem("order.items[1].quantity"),
        '单价:', await storage.getItem("order.items[1].price"));
    
    console.log('\n=== 支付信息 ===');
    console.log('支付方式:', await storage.getItem("order.payment.method"));
    console.log('支付状态:', await storage.getItem("order.payment.status"));
    console.log('交易编号:', await storage.getItem("order.payment.transactionId"));
    console.log('支付时间:', await storage.getItem("order.payment.paidTime"));
}

// 立即执行
setupOrderTestData();