import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 测试文件匹配模式
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    
    // 排除文件
    exclude: [
      'node_modules',
      'dist',
      'playground'
    ],
    
    // 测试环境
    environment: 'node',
    
    // 全局设置
    globals: true,
    
    // 测试超时
    testTimeout: 10000,
    
    // 报告器
    reporters: ['verbose']
  }
});
