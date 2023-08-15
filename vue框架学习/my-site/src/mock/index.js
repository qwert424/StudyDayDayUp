import Mock from "mockjs";

import '@/mock/banner.js';
import '@/mock/blog.js';
import '@/mock/setting.js';
import '@/mock/about.js';
import '@/mock/project.js';
import '@/mock/message';

//模拟网络延迟
Mock.setup({
    timeout: '1000-2000'
})