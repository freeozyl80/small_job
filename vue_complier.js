/*
这里尝试vue核心代码之complier
*/
var compileGetter = function (path) {   //user.name
    path = path.split('.');		// [user,name]
    let boby = 'if (o !=null';
    let pathString = 'o';
    let key;
    for (let i = 0; i < path.length - 1; i++) {
        key = path[i];			//user,   name
        pathString += `.${key}`;
        boby += ` && ${pathString} != null`;
    }
    key = path[path.length - 1];
    pathString += `.${key}`;
    boby += `) return ${pathString}`;
    return new Function('o', boby);   // eslint-disable-line
};

// observer
function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
   	configurable: false, //是否可以删除属性,是否可以修改属性的 writable 、 enumerable 、 configurable 属性。
    enumerable: false,   //是否可以枚举,是否可以通过for...in 遍历到，是否可以通过 Object.keys() 方法获取属性名称
    writable: false,     //是否可以对属性进行重新赋值
    value: null,　　　　　//属性的默认值
    set: undefined,     //属性被赋值时,此方法被自动调用
    get: undefined      //属性被读取时,此方法被自动调用
  });
};