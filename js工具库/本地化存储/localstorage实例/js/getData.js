// 网络请求 获取商品数据
import { getData } from '../api/getShoppingData.js';

const Data = await getData('./data/shoppingData.json');

export default Data;