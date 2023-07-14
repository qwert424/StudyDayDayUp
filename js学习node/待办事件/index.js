// // {/* <ul class="todo-list">
// // <li>
// //     <span>待办事项1</span>
// //     <button>删除</button>
// // </li>
// // </ul> */}

// /**
//  * 输入待办事项 按下回车后 添加事项到列表
//  */
// var ul = document.querySelector(".todo-list");
// var input = document.querySelector("input");

// function createLi(content) {
//     var li = document.createElement("li");
//     var span = document.createElement("span");
//     var button = document.createElement("button");
//     button.innerText = "删除";
//     button.addEventListener("click", deleteItem);
//     span.innerText = content;
//     li.appendChild(span);
//     li.appendChild(button);
//     ul.appendChild(li);
//     input.value = "";
// }

// //  绑定事件
// input.addEventListener('keyup', addEvent);

// function addEvent(e) {
//     if (e.key === "Enter") {
//         if (!input.value.trim()) {
//             return;
//         }
//         createLi(input.value.trim());
//     }
// }

// /**
//  * 点击删除后 删除对应的待办事项
//  */
// function deleteItem() {
//     ul.removeChild(this.parentElement);
// }



/**
 * 运用事件委托来优化代码：
 * 父元素加事件 冒泡 通过e.target.tagName筛选 然后冒泡事件删除
 */

// {/* <ul class="todo-list">
// <li>
//     <span>待办事项1</span>
//     <button>删除</button>
// </li>
// </ul> */}

/**
 * 输入待办事项 按下回车后 添加事项到列表
 */
var ul = document.querySelector(".todo-list");
var input = document.querySelector("input");

function createLi(content) {
    ul.innerHTML += "<li><span>" + content + "</span>" + "<button>删除</button></li>";
    ul.addEventListener("click", deleteItem);
}

//  绑定事件
input.addEventListener('keyup', addEvent);

function addEvent(e) {
    if (e.key === "Enter") {
        if (!input.value.trim()) {
            return;
        }
        createLi(input.value.trim());
        // 清空输入框
        input.value = "";
    }
}

/**
 * 点击删除后 删除对应的待办事项
 */
function deleteItem(e) {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
    }
}


