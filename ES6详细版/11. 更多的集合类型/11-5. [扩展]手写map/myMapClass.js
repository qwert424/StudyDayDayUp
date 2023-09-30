class myMapClass {
    constructor(iterable = []) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`你提供的${iterable}不是一个可迭代的对象`);
        }
        this._mapData = [];
        for (let item of iterable) {
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`你提供的${item}不是一个可迭代的对象`);
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value)
        }
    }

    // 长度只读
    get size() {
        return this._mapData.length;
    }

    // 设置
    set(key, value) {
        const item = this.getObj(key);
        if (item) {
            // 修改
            item.value = value;
        } else {
            // 添加
            this._mapData.push({
                key,
                value
            });
        }
    }

    // 删除
    delete(data) {
        for (let i = 0; i < this._mapData.length; i++) {
            const { key } = this._mapData[i];
            if (this.isEqual(key, data)) {
                this._mapData.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // 获取
    get(data) {
        const item = this.getObj(data)
        if (item) {
            return item.value;
        }
        return undefined;
    }

    getObj(data) {
        for (const item of this._mapData) {
            if (this.isEqual(item.key, data)) {
                return item;
            }
        }
        return undefined;
    }

    // 存在
    has(data) {
        return this.getObj(data) !== undefined;
    }

    // 判断
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }

    //清空
    clear() {
        this._mapData = [];
    }

    forEach(callback) {
        for (const { key, value } of this._mapData) {
            callback(value, key, this);
        }
    }

    *[Symbol.iterator]() {
        for (const { key, value } of this._mapData) {
            yield [key, value];
        }
    }
}