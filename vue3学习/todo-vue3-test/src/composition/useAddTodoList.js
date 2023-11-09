import { ref } from 'vue';
import { getRandomId } from '../utils/uselocalStorage'

export default function (TodoListRef) {
    let newTodoContentRef = ref("")
    const addTodoListFun = () => {
        // 获取输入框的值
        const newTodoContent = newTodoContentRef.value;
        // 判断输入框是否为空
        if (newTodoContent.trim() === '') {
            return;
        }
        // 把输入框的值添加到toduList中
        TodoListRef.value.unshift({
            id: getRandomId(),
            content: newTodoContent,
            isCompleted: false
        })
        // 清空输入框
        newTodoContentRef.value = '';
    }


    return {
        newTodoContentRef,
        addTodoListFun,
    }
}