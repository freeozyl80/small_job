//先看个简单的继承
var Person = function (argument) {
	this.eat = function (argument) {
		//每人都吃饭
	}
}
var Programmer = function (argument) {
	this.code = function (argument) {
		// 每人都会编程
	}
	// body...
};
Programmer.prototype = new Person();
Programmer.prototype.constructor = Programmer;

// Object.create = function (o) {
// 	function F(){};
// 	F.prototype = o;
// 	return new F();
// }
var Bob = new Person();

var Bobsun = Object.create(Bob);
Bobsun.__proto__ == Bob //true

var Jser = Object.create(Programmer.prototype);

Jser.js = function  (argument) {
	// body...
}
var Other = function (argument) {
	// body...
	this.dosome = function (argument) {
		// body...
	}
}
Other.prototype = Object.create(Person.prototype,{});
Other.prototype.constructor = Other;
Other.prototype.__proto__ == Person;

var Henry = new Other();
var Alice = new Programmer();
