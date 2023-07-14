(function () {
    function $(select) {
        return document.querySelector(select);
    }
    function $$(select) {
        return document.querySelectorAll(select);
    }
    var video = $('video');

    obj = {
        "item": $('.item'),
        "current": $('#current'),
        "alltime": $('#alltime'),
        "percentage": $('#percentage'),
        "playbtn": $('#btnplay'),
        "range1": $('.range input'),
        "range2": $('.sound input'),
        "btns": $$('.speed button'),
        "btnSave": $('#save'),
        "btnLoad": $('#load'),
        "playbackRate": video.playbackRate || 1,
        "volume": video.volume || 1,
        "currentTime": video.currentTime || 0,
    }

    // 主程序
    function main() {
        // 初始化
        video.addEventListener('loadeddata', init);
        // 绑定按钮事件
        addEvent();
    }

    var init = function () {
        obj["allTime"] = video.duration;
        obj.item.style.display = 'block';
        obj.alltime.innerText = count(obj["allTime"]);
        obj.range2.value = obj["volume"] * 100 || 100;
        obj.percentage.innerText = Math.floor(obj.range2.value) + '%';
        // 进度range设置为0 倍数选中1倍
        obj.range1.value = obj["currentTime"] || 0;
        obj.current.innerText = count(obj.range1.value);
        var btnActive = $('.active');
        btnActive ? btnActive.classList.remove('active') : false;
        obj.btns.forEach(function (node) {
            node.dataset["speed"] === obj.playbackRate + "" ? node.classList.add('active') : false;
        })
    }


    // 绑定按钮事件
    var addEvent = function () {
        // 开始点击事件
        obj.playbtn.addEventListener('click', play);
        // 进度点击事件
        obj.range1.addEventListener('change', progress);
        // 播放事件 每一帧执行
        video.addEventListener('timeupdate', function () {
            obj["currentTime"] = video.currentTime;
            obj.range1.value = obj["currentTime"] / obj["allTime"] * 100;
            obj.current.innerText = count(obj["currentTime"])
        });
        // 音频声音控制事件
        obj.range2.addEventListener('change', percentage);
        // 播放结束事件
        video.addEventListener('ended', function () {
            this.currentTime = 0;
            obj["currentTime"] = this.currentTime;
            requestAnimationFrame(function () {
                obj.current.innerText = count(obj["currentTime"]);
            })
        })
        // 播放速率
        obj.btns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var btnActive = $('.active');
                btnActive.classList.remove('active');
                btn.classList.add("active");
                video.playbackRate = btn.dataset["speed"];
                obj.playbackRate = video.playbackRate
            });
        })
        // 保存设置
        obj.btnSave.addEventListener("click", function () {
            // if(localStorage.getItem("obj")
            localStorage.setItem("obj", JSON.stringify(obj));
            // alert("保存成功");
        })
        // 加载设置
        obj.btnLoad.addEventListener("click", function () {
            var newobj = JSON.parse(localStorage.getItem("obj"))
            obj["currentTime"] = newobj.currentTime;
            obj["volume"] = newobj.volume;
            obj["playbackRate"] = newobj.playbackRate;
            obj.range1.value = obj["currentTime"] / obj["allTime"] * 100;
            video.currentTime = newobj.currentTime;
            init();
        });
    }

    var play = function () {
        video.paused ? video.play() : video.pause()
    }

    var progress = function () {
        video.currentTime = obj.range1.value / 100 * obj["allTime"];
        obj["currentTime"] = video.currentTime;
        obj.current.innerText = count(obj["currentTime"])
    }

    var percentage = function () {
        video.volume = this.value / 100;
        obj["volume"] = video.volume;
        obj.percentage.innerText = Math.floor(this.value) + "%";
    }

    var count = function (time) {
        var num1,
            num2,
            num3;
        var time = Math.ceil(time);
        num1 = (Math.floor(time / 3600) + "").padStart(2, 0);
        num2 = (Math.floor(time / 60) % 60 + "").padStart(2, 0);
        num3 = (time % 60 + "").padStart(2, 0);
        return num1 + ":" + num2 + ":" + num3;
    }

    main();
}())