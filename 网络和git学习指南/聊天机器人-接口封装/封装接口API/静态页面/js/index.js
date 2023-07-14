(() => {
    const chatContainer = $('.chat-container');
    // 1、判断是否登录了
    isLogin();
    async function isLogin() {
        const resp = await API.profile();
        if (resp.code !== 0) {
            alert("未登录或登录已过期，请重新登录");
            location.href = './login.html'
        }
    }

    // 2、侧边栏用户信息
    addAside();
    async function addAside() {
        const asideNickname = $('.aside #nickname');
        const asideLoginId = $('.aside #loginId');
        const resp = await API.profile();
        if (resp.code === 0) {
            asideNickname.innerText = "" + resp.data.nickname;
            asideLoginId.innerText = "" + resp.data.loginId;
        }
    }

    // 3、退出登录
    const btn = $('.close')
    btn.onclick = () => {
        API.loginOut();
        alert("退出成功，点击确定跳转登录界面");
        location.href = './login.html'
    }

    // 4、聊天记录获取
    //     <div class="chat-item me">
    //     <img class="chat-avatar" src="./asset/avatar.png" />
    //     <div class="chat-content">你几岁啦？</div>
    //     <div class="chat-date">2022-04-29 14:18:13</div>
    //   </div>
    //   <div class="chat-item">
    //     <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    //     <div class="chat-content">讨厌，不要随便问女生年龄知道不</div>
    //     <div class="chat-date">2022-04-29 14:18:16</div>
    //   </div>
    getHistory();
    async function getHistory() {
        const resp = await API.getHistory();
        const data = Array.from(resp.data).map(data => {
            return {
                "from": data.from,
                "content": data.content,
                "createdAt": data.createdAt,
            }
        })
        data.forEach(data => {
            addData(data.from, data.content, data.createdAt)
        })
        scrollBottom();
    }

    // 5、添加数据
    function addData(from, content, createdAt) {
        const chatItem = $$$('div');
        const chatAvatar = $$$('img');
        const chatContent = $$$('div');
        const chatDate = $$$('div');
        chatItem.classList.add('chat-item');
        chatAvatar.classList.add('chat-avatar');
        chatAvatar.src = from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
        chatContent.classList.add('chat-content');
        chatContent.innerText = content;
        chatDate.classList.add('chat-date');
        chatDate.innerText = formatDate(createdAt);
        if (from) {
            chatItem.classList.add('me')
        }
        chatItem.appendChild(chatAvatar)
        chatItem.appendChild(chatContent)
        chatItem.appendChild(chatDate)
        chatContainer.appendChild(chatItem)
    }

    // 格式化时间
    function formatDate(date) {
        const data = new Date(date);
        const year = data.getFullYear();
        const month = (data.getMonth() + 1).toString().padStart(2, '0');
        const day = data.getDate().toString().padStart(2, '0');
        const hour = data.getHours().toString().padStart(2, '0');
        const minute = data.getMinutes().toString().padStart(2, '0');
        const second = data.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

    // 滚动条位置
    function scrollBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 6、发送消息
    const form = $('.msg-container')
    form.onsubmit = sendMessage;
    async function sendMessage(e) {
        e.preventDefault();
        const input = $('#txtMsg')
        const value = input.value.trim()
        if (!value) {
            return;
        }
        input.value = "";
        const data = new Date();
        addData(1, value, data)
        scrollBottom();
        form.onsubmit = function (e) {
            e.preventDefault();
        };
        const result = await API.sendChat({ "content": value });
        if (result.code === 0) {
            console.log(result);
            addData(0, result.data.content, result.data.createdAt)
            scrollBottom();
        }
        form.onsubmit = sendMessage;
    }

})()
