function test(a = b, b) {
    console.log(a, b);//暂时性死区 b在暂时性死区
}

test(undefined, 2);