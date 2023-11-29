export function myPlugin1() {
    return {
        test: '我是新的属性测试'
    }
}
export function myPlugin2(context) {
    console.log(context)
}