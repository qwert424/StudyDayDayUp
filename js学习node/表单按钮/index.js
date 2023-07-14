/**
 * 根据协议的多选择框是否选择设置注册按钮的状态
 */
function setSubmitButtonStatus() {
    var input = document.querySelector('input[type="checkbox"]');
    var button = document.querySelector('button[type="submit"]');
    button.disabled = !input.checked;
}
setSubmitButtonStatus();

/**
 * 根据手机号文本框的文本，设置发送验证码按钮的状态
 */
function setSendCodeButtonStatus() {
    var input = document.querySelector('input.txt');
    var button = document.querySelector('button[type="button"]');
    button.disabled = !(input.value.length === 11);
}
setSendCodeButtonStatus()

/**
 * 根据当前选中的爱好，设置已选择的爱好文本
 */
function setSelectedLoves() {
    var selectedLoves = document.querySelectorAll("option");
    var loves = document.querySelector(".loves");
    var arr = [];
    for (var i = 0; i < selectedLoves.length; i++) {
        if (selectedLoves[i].selected) {
            arr.push(selectedLoves[i].innerHTML);
        }
    }
    arr.join("、");
    loves.innerHTML = "已选择的爱好：" + arr;
}
setSelectedLoves()

// 将事件和函数相关联
document.querySelector('input[type="checkbox"]').addEventListener("change", setSubmitButtonStatus)
document.querySelector('input.txt').addEventListener('input', setSendCodeButtonStatus)
document.querySelector("select").addEventListener('change', setSelectedLoves)

//给所有文本框注册事件 当用户按下esc 清空当前文本框
for (var i = 0; i < document.querySelectorAll(".txt").length; i++) {
    document.querySelectorAll(".txt")[i].addEventListener('keyup', test)
}
function test(e) {
    if (e.key === "Escape") {
        this.value = "";
    }
}