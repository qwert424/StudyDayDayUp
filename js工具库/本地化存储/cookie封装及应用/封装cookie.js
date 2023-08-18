const manageCookie = {
    // 设置cookie
    setCookie(name, value, date) {
        //expires data为天
        // const newDate = new Date();
        // newDate.setDate(newDate.getDate() + date);
        // document.cookie = `${name}=${value};expires=${newDate}`;
        //max-age data为秒
        document.cookie = `${name}=${value};max-age=${date}`;
    },
    // 删除cookie
    removeCookie(name) {
        this.setCookie(name, '', 0);
    },
    // 获取cookie
    getCookie(name) {
        const cookieArr = document.cookie.split('; ');
        let value;
        cookieArr.forEach(item => {
            const arr = item.split('=');
            if (arr[0] === name) {
                value = arr[1];
            }
        })
        return value;
    }
}

export default manageCookie;