import * as TodolocalStorage from '../utils/uselocalStorage';
import { ref, watchEffect } from 'vue';

export default function getTodoList() {
    const TodoListRef = ref(TodolocalStorage.getTodolocalStorage());
    watchEffect(() => {
        TodolocalStorage.addTodolocalStorage(TodoListRef.value);
    })
    return TodoListRef;
}

