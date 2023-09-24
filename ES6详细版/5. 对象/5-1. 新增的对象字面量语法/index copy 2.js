const user = {
    name: "angel",
    age: 100,
    sayHello(){
        console.log(this.name, this.age)
    }
}

user.sayHello();