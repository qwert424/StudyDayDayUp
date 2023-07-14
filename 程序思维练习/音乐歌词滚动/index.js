(() => {
    // 主程序
    function main() {
        // 初始化
        init();
        // 绑定事件
        addEvent();
    };

    // 获取Dom元素
    const audio = document.querySelector('.audio-item audio');
    const musicContainer = document.querySelector('.music-container');
    const musicItem = document.querySelector('.music-item');
    musicItem.style.top = 0 + 'px';
    const MCH = parseInt(window.getComputedStyle(musicContainer).height);//容器高度一般
    const num = 30;//切换幅度
    let currentTime = 0;//时间

    // 初始化
    /**
     * 初始化函数 需求：
     * 1、音频状态初始化
     * 2、获取歌词
     * 3、音频加载完成后显示歌词 起初隐藏
     */
    const init = function () {
        // 1、音频状态初始化
        audioInit();
        // 3、音频加载完成后显示歌词 起初隐藏
        audio.addEventListener('loadeddata', async () => {
            await addmusic();
            musicContainer.style.display = 'flex';
            parseInt(window.getComputedStyle(musicItem).height) < 500 ? musicContainer.style.display = 'flex' : musicContainer.style.display = 'block';
            musicItem.firstChild.classList.add('selected');
        })
    }

    // 1、音频状态初始化
    const audioInit = () => {
        audio.setAttribute('controls', "");
        audio.currentTime = 0;
        audio.volume = 1;
        audio.playbackRate = 1;
    }

    // 2、获取歌词
    const addmusic = async () => {
        const music = await getLrc()
        const arr = music.trim().split('\n')
        for (const item of arr) {
            let li = document.createElement('li');
            li.innerText = item.substring(10);
            li.innerText ? true : li.innerText = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
            li.setAttribute("data-time", item.substring(1, 9))
            musicItem.appendChild(li)
        }
    }

    // 绑定事件
    const addEvent = () => {
        audio.addEventListener('timeupdate',
            // 歌词滚动 样式切换函数
            musicrun
        )
        audio.addEventListener('ended', () => {
            audioInit();
            musicItem.style.top = 0;
            currentTime = audio.currentTime;
        })
    }

    // 歌词滚动函数
    const musicrun = () => {
        Array.from(musicItem.children).forEach((item, index) => {
            if (`${timeInit(audio.currentTime)}`.substring(0, 5) === item.dataset.time.substring(0, 5)) {
                const selected = document.querySelector('.selected')
                selected ? selected.classList.remove('selected') : false;
                item.classList.add('selected');
                if (num * index > MCH / 2) {
                    musicItem.style.top = -num * index + MCH / 2 + 'px';
                } else if (num * index < MCH / 2) {
                    musicItem.style.top = 0;
                }
            }
        })

    }

    // 时间格式化
    const timeInit = (time) => {
        const minute = Math.floor(time / 60).toString().padStart(2, '0');
        const second = Math.floor((time - minute * 60)).toString().padStart(2, '0');
        const ms = (time - minute * 60 - second).toString().padStart(2, '0').substring(2, 4);
        return `${minute}:${second}.${ms}`;
    }

    main();

})()