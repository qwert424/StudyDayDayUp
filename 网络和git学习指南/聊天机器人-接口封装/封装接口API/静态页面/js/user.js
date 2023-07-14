/**
 * 封装一个用户输入信息构造函数 用于对输入的信息进行初步的筛选 继而通过网络验证
 * @param {String}inputId
 * @param {Function}verification 验证函数 成功不返回错误信息 失败返回错误信息
 */

class User {
    constructor(inputId, verification) {
        this.input = $(`#${inputId}`);
        this.p = this.input.nextElementSibling;
        this.verification = verification;
        // 失去焦点开始验证
        this.input.onblur = () => {
            this.validate()
        };
    }

    // 静态方法 判断是否全部符合
    static async validateAll(...args) {
        const prom = args.map(r => r.validate());
        const result = await Promise.all(prom);
        return result.every(r => r);
    };

    // 回调函数判断
    async validate() {
        const err = await this.verification(this.input.value);
        if (err) {
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = "";
            return true;
        }
    }
}