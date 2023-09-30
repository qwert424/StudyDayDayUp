class mySetClass {
    constructor(iterable = []) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`你输入的${iterable}不是一个可迭代对象`)
        }
        this._data = [];
        for (const item of iterable) {
            this.add(item);
        }
    }

    get size() {
        return this._data.length;
    }

    // 添加
    add(data) {
        // 判断当前数据是否已经存在
        if (!this.has(data)) {
            this._data.push(data);
        }
    }

    // 删除
    delete(data) {
        // 判断当前数据是否已经存在
        if (this.has(data)) {
            this._data.splice(this._data.indexOf(data), 1);
            return true;
        }
        return false;
    }

    // 清空
    clear() {
        this._data = [];
    }

    // 判断
    has(data) {
        for (const item of this._data) {
            if (this.isEqual(item, data)) {
                return true;
            }
        }
        return false;
    }

    // 判断
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }

    // 可迭代对象
    *[Symbol.iterator]() {
        for (const item of this._data) {
            yield item;
        }
    }

    forEach(callback) {
        for (const item of this._data) {
            callback(item, item, this);
        }
    }
}