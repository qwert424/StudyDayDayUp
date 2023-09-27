class Temperature {
    constructor(degree) {
        this.degree = degree;
    }

    [Symbol.toPrimitive](type) {//类型转换的结果
        // console.log(type)//得到要转换的类型
        if (type === "default") {
            return this.degree + "摄氏度";
        }
        else if (type === "number") {
            return this.degree;
        }
        else if (type === "string") {
            return this.degree + "℃";
        }
    }
}

const t = new Temperature(30);

console.log(t + "!");
console.log(t / 2);
console.log(String(t));