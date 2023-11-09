<template>
  <div class="" id="todus-container">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoContentRef"
          @keydown.enter="addTodoListFun"
          @blur="addTodoListFun"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="
            completedTodoListLenRef === filterTodoListRef.length &&
            completedTodoListLenRef !== 0
          "
          @click="handleChange(undefined, $event)"
          :disabled="!filterTodoListRef.length"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="(item, index) in filterTodoListRef"
            :key="item.id"
            :class="{
              completed: item.isCompleted,
              editing: item === isEditingRef,
            }"
          >
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                @click="handleChange(index, $event)"
                :checked="item.isCompleted"
              />
              <label @dblclick="handleEdit($event, item)">{{
                item.content
              }}</label>
              <button class="destroy" @click="deleteTodoItem(index)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="EditContentRef"
              autofocus
              @blur="accomplishEdit($event, index)"
              @keydown.enter="accomplishEdit($event, index)"
              @keydown.escape="accomplishEdit($event)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="TodoListRef.length">
        <span class="todo-count">
          <strong>{{ filterTodoListRef.length }}</strong>
          <span>item{{ filterTodoListRef.length > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a
              href="#/all"
              :class="visibleConditionRef === 'all' ? 'selected' : ''"
              >All</a
            >
          </li>
          <li>
            <a
              href="#/active"
              :class="visibleConditionRef === 'active' ? 'selected' : ''"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="visibleConditionRef === 'completed' ? 'selected' : ''"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedTodoListLenRef && visibleConditionRef !== 'active'"
          @click="deleteAllCompleteTodoList"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import getTodoList from "./composition/useTodoList";
import addTodoItem from "./composition/useAddTodoList";
import selectTodoList from "./composition/useSelectTodoList";
import editTodoList from "./composition/useEditTodoList";
import deleteTodoList from "./composition/useDeleteTodoList";
export default {
  name: "App",
  components: {},
  setup() {
    // 1、新增任务类
    const TodoListRef = getTodoList();
    // 2、筛选任务类
    // 3、修改任务类
    // 4、删除任务类

    return {
      TodoListRef,
      ...addTodoItem(TodoListRef),
      ...selectTodoList(TodoListRef),
      ...editTodoList(TodoListRef),
      ...deleteTodoList(TodoListRef),
    };
  },
};
</script>
