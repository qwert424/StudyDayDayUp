// 知识点：只要进行数据传递 都可以进行数据解构


/**
 * 创建一个用户对象
 * 对象格式：
 * {
 *    firstName: xxx,
 *    lastName: xxx,
 *    fullName: xxx,
 *    sayHello: fn
 * }
 */
function createUser(firstName, lastName) {
    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        sayHello() {
            console.log('Hello, ${firstName}')
        }
    }
}

// 调用createUser函数，使用解构得到fullName
const {fullName} =createUser('aaa','bbb')
console.log(fullName)
