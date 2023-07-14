(function () {
    var provinceSelect = document.getElementById("province");
    var citySelect = document.getElementById("city");
    var schoolSelect = document.getElementById("school");
    var newobj = obj.slice(0,);

    // 初始化
    function init() {
        //监听 当省份没有选择 禁用其他两个选项
        monitor();
        // 绑定事件
        addEvent()


    }
    init()

    // 监听
    function monitor() {
        schoolSelect.disabled = citySelect.disabled = (provinceSelect.value === "null")
    }

    // 绑定事件
    function addEvent() {
        provinceSelect.addEventListener("mousedown", create)

        provinceSelect.addEventListener("change", function () {
            var value = this.value;
            // 监听
            monitor();
            // 关联 省份和（城市+学校）
            relate(value);
            // 关联2 城市+学校
        })
    }

    // 生成数据
    function create() {
        provinceSelect.removeEventListener("mousedown", create)
        for (var i = 0; i < newobj.length; i++) {
            if (!newobj[i].province && !newobj[i].value) {
                return;
            } else {
                var provinceoption = document.createElement("option");

                provinceoption.textContent = newobj[i].province;

                provinceoption.value = newobj[i].value;

                provinceSelect.appendChild(provinceoption);
            }
        }
    }

    // 关联
    function relate(value) {
        for (var i = 0; i < newobj.length; i++) {
            if (newobj[i].value === value && newobj[i].city.length !== 0) {
                citySelect.innerHTML = "";
                schoolSelect.innerHTML = "";
                for (var j = 0; j < newobj[i].city.length; j++) {
                    var cityoption = document.createElement("option");
                    cityoption.textContent = newobj[i].city[j].cityName;
                    citySelect.appendChild(cityoption);

                }
                if (newobj[i].city[0].school.length !== 0) {
                    for (var m = 0; m < newobj[i].city[0].school.length; m++) {
                        if (newobj[i].city[0].school[m] !== undefined) {
                            var schooloption = document.createElement("option");
                            schooloption.textContent = newobj[i].city[0].school[m];
                            schoolSelect.appendChild(schooloption);
                        }
                    }
                }
                citySelect.addEventListener("click", relateTwo);
                citySelect.addEventListener("change", relateTwo);
                schoolSelect.addEventListener("click", relateThree);
                schoolSelect.addEventListener("change", relateThree);
                return;
            } else {
                citySelect.innerHTML = "<option>无</option>";
                schoolSelect.innerHTML = "<option>无</option>";
                if (newobj[i].city.length === 0) {
                    schoolSelect.disabled = citySelect.disabled = true;
                    return
                }
            }
        }

    }

    function relateTwo() {
        citySelect.removeEventListener("click", relateTwo);
        for (var i = 0; i < newobj.length; i++) {
            for (var j = 0; j < newobj[i].city.length; j++) {
                if (this.value === newobj[i].city[j].cityName) {
                    schoolSelect.innerHTML = "";
                    if (newobj[i].city[j].school.length !== 0) {
                        schoolSelect.disabled = false;
                        for (var m = 0; m < newobj[i].city[j].school.length; m++) {
                            if (newobj[i].city[j].school[m] !== undefined) {
                                var schooloption = document.createElement("option");
                                schooloption.textContent = newobj[i].city[j].school[m];
                                schoolSelect.appendChild(schooloption);
                            }
                        }
                    } else {
                        schoolSelect.disabled = true;
                        var schooloption = document.createElement("option");
                        schoolSelect.innerHTML = "<option>无</option>";
                    }
                }
            }
        }
    }

    function relateThree() {
        schoolSelect.removeEventListener("click", relateThree);
        for (var i = 0; i < newobj.length; i++) {
            for (var j = 0; j < newobj[i].city.length; j++) {
                for (var m = 0; m < newobj[i].city[j].school.length; m++) {
                    if (this.value === newobj[i].city[j].school[m]) {
                        citySelect.value = newobj[i].city[j].cityName
                    }
                }
            }
        }
    }
}())