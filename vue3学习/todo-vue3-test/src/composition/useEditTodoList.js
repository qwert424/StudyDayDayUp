import { ref } from 'vue';

export default function (TodoListRef) {
    let EditContentRef = ref(null);//edit content
    let isEditingRef = ref(false);//is editing
    let orgContentRef = ref("");//is editing
    // 打开修改框
    function handleEdit(e, item) {
        isEditingRef.value = item;
        EditContentRef.value = e.target.innerText
        orgContentRef.value = e.target.innerText
    }

    // 完成修改
    function accomplishEdit(e, index) {
        if (e.type === 'keydown' && e.key === 'Escape') {
            isEditingRef.value = null;
            EditContentRef.value = orgContentRef.value;
            return;
        }
        const EditTodoContent = EditContentRef.value;
        if (EditTodoContent.trim() === '') {
            TodoListRef.value.splice(index, 1)
            return
        }
        TodoListRef.value[index].content = EditTodoContent.trim();
        isEditingRef.value = null;
    }
    return {
        handleEdit,
        accomplishEdit,
        EditContentRef,
        isEditingRef,
    }
}