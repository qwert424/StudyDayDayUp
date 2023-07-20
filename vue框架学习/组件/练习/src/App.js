import MyButton from "./components/MyButton.js";
// 组件本质就是一个对象
// 此处引用组件进行写一个总模板给main渲染
// vue根组件
const template = `
<div>
    <MyButton title='1'></MyButton>
    <MyButton title='2'></MyButton>
</div>
`;

export default {
    components: {
        MyButton
    },
    template
}