import { ref, onMounted, onUnmounted, computed } from 'vue'

export default function (TodoListRef) {
    const visibleConditionRef = ref('all');//默认可见状态
    const visibleArr = ['all', 'active', 'completed']
    onMounted(() => {
        window.addEventListener('hashchange', selectTodoListFun)
    })
    onUnmounted(() => {
        window.removeEventListener('hashchange', selectTodoListFun)
    })

    const selectTodoListFun = () => {
        const locationHash = location.hash.replace(/#\/?/, "")
        if (visibleArr.includes(locationHash)) {
            visibleConditionRef.value = locationHash;
        } else {
            visibleConditionRef.value = 'all';
            location.hash = '';
        }
    }

    // 筛选列表方法
    function filterTodoListFun(TodoListRef, visibleConditionRef = 'all') {
        if (visibleConditionRef === 'all') {
            return TodoListRef
        } else if (visibleConditionRef === 'active') {
            return TodoListRef.filter(item => !item.isCompleted)
        } else if (visibleConditionRef === 'completed') {
            return TodoListRef.filter(item => item.isCompleted)
        } else {
            new Error('Unknown condition')
        }
    }

    // 筛选列表
    const filterTodoListRef = computed(() => {
        return filterTodoListFun(TodoListRef.value, visibleConditionRef.value)
    })

    // 完成任务数量
    const completedTodoListLenRef = computed(() => {
        return filterTodoListFun(TodoListRef.value, 'completed').length
    })

    function handleChange(index, e) {
        if (!index && index !== 0) {
            filterTodoListRef.value.forEach(item => {
                item.isCompleted = e.target.checked;
            });
            if (visibleConditionRef.value === 'active') {
                e.target.checked = false
            }
        } else {
            filterTodoListRef.value[index].isCompleted = e.target.checked;
        }
    }

    return {
        visibleConditionRef,
        filterTodoListRef,
        completedTodoListLenRef,
        handleChange
    }
}