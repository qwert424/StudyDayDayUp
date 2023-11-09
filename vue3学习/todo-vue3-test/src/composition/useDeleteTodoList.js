export default function (TodoListRef) {
    function deleteAllCompleteTodoList() {
        TodoListRef.value = TodoListRef.value.filter(item => !item.isCompleted)

    }
    function deleteTodoItem(index) {
        TodoListRef.value.splice(index, 1)
    }
    return {
        deleteAllCompleteTodoList,
        deleteTodoItem
    };
}