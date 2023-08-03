import Mock from "mockjs";

import '@/mock/banner.js';
import '@/mock/blog.js';

//模拟网络延迟
Mock.setup({
    timeout: '1000-2000'
})