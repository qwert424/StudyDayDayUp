// 实现手写Promise方法
// 实现A+规范 then方法重点

// 常量定义
const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

// 构造函数
class MyPromise {
    /**
    * 创建一个Promise
    * @param {Function} execute 任务执行器，立即执行
    */
    constructor(execute) {
        this._status = PENDING;//运行状态
        this._value = undefined;//数据
        this._handlersQuequ = [];//队列列表
        // 捕获错误
        try {
            execute(this._resolve.bind(this), this._reject.bind(this))//执行体
        } catch (error) {
            this._reject(error);//直接失败调用
        }
    }

    /**
    * Promise A+规范的then
    * 添加到微队列 返回Promise对象
    * @param {Function} onFulfilled
    * @param {Function} onRejected
    */
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._handlersQuequAdd(FULFILLED, onFulfilled, resolve, reject);
            this._handlersQuequAdd(REJECTED, onRejected, resolve, reject);
            this._runHandlersQuequ();
        })
    }

    /**
     * 批量处理队列
     */
    _runHandlersQuequ() {
        if (this._status === PENDING) {
            // 函数运行中
            return;
        }
        // 取出队列每一项 边取边删除
        while (this._handlersQuequ[0]) {
            const handler = this._handlersQuequ[0];
            this._handlersOneQuequ(handler)
            this._handlersQuequ.shift();
        }
    }

    /**
     * 处理单个队列
     * @param {*} handler 
     * @returns 
     */
    _handlersOneQuequ({ status, callback, resolve, reject }) {
        if (this._status !== status) {
            return;
        }
        if (typeof callback !== 'function') {
            // 传入的不是回调函数
            this._status === FULFILLED ? resolve(this._value) : reject(this._value);
            return;
        }
        try {
            const value = callback(this._value)
            // 判断promise对象
            if (isPromiseObject(value)) {
                value.then(resolve, reject)
            } else {
                resolve(value);
            }
        } catch (error) {
            reject(error);
        }
    }

    /**
     * 在队列列表添加内容
     * @param {*} status 执行状态
     * @param {Function} callback 执行函数
     * @param {Function} resolve 成功调用
     * @param {Function} reject 失败调用
     */
    _handlersQuequAdd(status, callback, resolve, reject) {
        this._handlersQuequ.push({ status, callback, resolve, reject })
    }

    /**
     * 成功运行函数 返回数据
     * @param {any} data  数据
     */
    _resolve(data) {
        this._changeState(FULFILLED, data); return
    }

    /**
     * 失败运行函数 返回失败原因
     * @param {any} reason 失败原因 
     */
    _reject(reason) {
        this._changeState(REJECTED, reason); return
    }

    /**
     * 改变状态
     * @param {*} state 状态
     * @param {*} value 数据
     */
    _changeState(state, value) {
        // 判断
        if (this._status !== PENDING) return
        this._status = state;
        this._value = value;
        this._runHandlersQuequ();
    }

    /**
     * A+规范之外的一些函数
     */

    /**
     * 捕获错误的函数
     * @param {Function} onRejected 错误函数回调
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    /**
     * finally 执行
     */
    finally(callback) {
        return this.then((data) => {
            callback();
            return data;
        }, (reason) => {
            callback();
            throw reason;
        })
    }

    /**
     * MyPromise 静态方法实现
     */

    /**
      * 返回一个已完成的Promise
      * 特殊情况：
      * 1. 传递的data本身就是ES6的Promise对象
      * 2. 传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
      * @param {any} data
      */
    static resolve(data) {
        if (data instanceof Promise) {
            return data;
        }
        return new MyPromise((resolve, reject) => {
            if (isPromiseObject(data)) {
                data.then(resolve, reject);
            } else {
                resolve(data);
            }
        })
    }

    /**
     * 返回一个被拒绝的Promise
     * @param {any} reason 原因
    */
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        })
    }

    /**
     * all 静态方法
     * @param {Iterable} iterable 可迭代对象
     * 得到一个新的Promise
     * 该Promise的状态取决于proms的执行
     * iterable是一个迭代器，包含多个Promise 用for-of循环
     * 全部Promise成功，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
     * 只要有一个Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
     * @param {iterator} proms
     */
    static all(iterable = []) {
        return new MyPromise((resolve, reject) => {
            try {
                const result = [];//按顺序存储每个成功的值
                let count = 0;//传入参数总数
                let fulfilledNumber = 0;//完成的个数
                for (const prop of iterable) {
                    let index = count;
                    count++;
                    MyPromise.resolve(prop).then((data) => {
                        fulfilledNumber++;
                        result[index] = data;
                        // console.log(result);
                        if (fulfilledNumber === count) {
                            resolve(result);
                        }
                    }, reject)
                }
                if (count === 0) {
                    // 此时不进入循环 直接返回成功
                    resolve(result);
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
    * allSettled 静态方法
    * @param {Iterable} iterable 可迭代对象
    * 得到一个新的Promise
    * iterable是一个迭代器，包含多个Promise 用for-of循环
    * 全部Promise已决，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
    * 永不失败
    * @param {iterator} proms
    */
    static allSettled(iterable = []) {
        // 思路:将每个传入的可迭代对象进行转换后 通过then获得新的promise对象 且状态和数据和then函数的调用有关 存储在对象中 且这些对象都是不会拒绝的 所以 在通过All静态方法可以获得结果
        const result = [];
        for (const prop of iterable) {
            result.push(MyPromise.resolve(prop).then(value => {
                return {
                    status: FULFILLED,
                    value
                }
            }, reason => {
                return {
                    status: REJECTED,
                    reason
                }
            }))
        }
        return MyPromise.all(result);
    }

    /**
     * race 静态方法
     * 得到一个新的Promise
     * iterable是一个迭代器，包含多个Promise 用for-of循环
     * 最先Promise成功，则返回的Promise成功，失败则返回失败
     * 如果传入为空 pending
     */
    static race(iterable) {
        return new MyPromise((resolve, reject) => {
            for (const prop of iterable) {
                MyPromise.resolve(prop).then(resolve, reject);
            }
        })
    }

}



/**
 * 创建微队列
 * @param {Function} callback 回调函数
 * @returns 
 */
function MicroQueue(callback) {
    // 环境判断
    // 判断node环境
    // 为了避免「变量未定义」的错误，这里最好加上前缀globalThis
    // globalThis是一个关键字，指代全局对象，浏览器环境为window，node环境为global
    if (globalThis.process && globalThis.process.nextTick) {
        return process.nextTick(callback)
    } else if (globalThis.MutationObserver) {
        //有一些缺陷 
        const p = document.createElement('p');
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true,
        })
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0)
    }
}

/**
 * 判断是不是promise对象
 * @param {*} target 判断对象
 */
function isPromiseObject(target) {
    return !!(target && typeof target.then === 'function' && typeof target === 'object')
}

// 测试
// const promise = new MyPromise((resolve, reject) => {
//     resolve(111)
// })
// const prop = promise.then((data) => {
//     return new MyPromise((resolve, reject) => {
//         resolve(data)
//     })
// }, 11);
// const prop1 = promise.then((data) => {
//     return new MyPromise((resolve, reject) => {
//         reject(1)
//     })
// }, 11);
// console.log(prop, prop1)

// 互通性
// const prop3 = new Promise((resolve, reject) => {
//     resolve(1)
// });
// prop3.then((data) => {
//     return new MyPromise((resolve, reject) => {
//         resolve(data)
//     })
// })
// setTimeout(() => {
//     console.log(prop3)

// })

// async function test() {
//     const resp = await new MyPromise((resolve, reject) => {
//         resolve(333)
//     })
//     console.log(resp)
// }
// test()

// catch测试
// const prop = new Promise((resolve, reject) => {
//     reject(111)
// })
// prop.catch(err => {
//     console.log(err)
// })
// const prop1 = new MyPromise((resolve, reject) => {
//     reject(111)
// })
// prop1.catch(err => { console.log(err) });

// finally测试
// const prop = new Promise((resolve, reject) => {
//     reject(111)
// })
// prop.finally(data => {
//     console.log(data)
//     throw 123
// })

// const prop1 = new MyPromise((resolve, reject) => {
//     reject(111)
// })
// const prop2 = prop1.finally(data => {
//     throw 123
// })
// setTimeout(() => {
//     console.log(prop2)
// })

// all测试
// const prop = new Promise((resolve, reject) => {
//     setTimeout(() => { resolve() }, 100)
// })

// const prop2 = Promise.all([prop, Promise.resolve(2), 3])
// prop2.then(() => {
//     console.log(prop2)
// })

// const prop = new MyPromise((resolve, reject) => {
//     setTimeout(() => { reject(111) }, 100)
// })

// const prop2 = MyPromise.all(null)
// prop2.then((data) => {
//     console.log(data)
// }, (reason) => {
//     console.log(reason)
// })
// setTimeout(()=>{
//     console.log(prop2)
// },1000)

// allSettled测试
// const prop = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // throw 123;
//         reject(111)
//     }, 100)
// })
// const prop2 = MyPromise.allSettled([prop, Promise.resolve(2), 3])
// prop2.then((data) => {
//     console.log(data)
// })
// // setTimeout(() => {
//     console.log(prop2)
// }, 1500)

// race测试
// const prop = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // throw 123;
//         reject(111)
//     }, 1222)
// })
// const prop3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // throw 123;
//         resolve(111)
//     }, 1000)
// })
// const prop2 = Promise.race([])
// prop2.then((data) => {
//     console.log('成功', data)
// }, (reason) => {
//     console.log('失败', reason)
// })
// setTimeout(() => {
//     console.log(prop2)
// }, 2000)

// const prop = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // throw 123;
//         reject(111)
//     }, 1222)
// })
// const prop3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // throw 123;
//         resolve(111)
//     }, 1000)
// })
// const prop2 = MyPromise.race([prop, prop3])
// prop2.then((data) => {
//     console.log('成功', data)
// }, (reason) => {
//     console.log('失败', reason)
// })
// setTimeout(() => {
//     console.log(prop2)
// }, 2000)