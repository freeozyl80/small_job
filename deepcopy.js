// 方法一
function deepCopy(obj) {
    var newObj = {},
        srcQueue = [obj], srcVisitedQueue = [],
        copyQueue = [newObj], copyVisitedQueue = [];

    while (srcQueue.length > 0) {
        var currentSrcElement = srcQueue.shift(),
            currentCopyElement = copyQueue.shift();

        srcVisitedQueue.push(currentSrcElement);
        copyVisitedQueue.push(currentCopyElement);

        for (var key in currentSrcElement) {
            if (typeof currentCopyElement[key] !== 'object') {
                currentCopyElement[key] = currentSrcElement[key];
            } else {
                // 有环的情况
                var index = srcVisitedQueue.indexOf(currentSrcElement[key]);
                if (index >= 0) {
                    currentCopyElement[key] = copyVisitedQueue[index];
                } else {
                    srcQueue.push(currentSrcElement[key]);
                    currentCopyElement[key] = {};
                    copyQueue.push(currentCopyElement[key]);
                }
            }
        }
    }

    return newObj;
}
// 方法二
var $ = (function(){
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }
  for (var i = types.length; i--;) {
     $['is' + types[i]] = (function (self) {
        return function (elem) {
           return type.call(elem) === self;
        };
    })(types[i]);
  }
  return $;
})();//类型判断

function copy(obj,deep){ 
  if(obj === null || typeof obj !== "object"){ 
     return obj; 
  } 　　　　　
  var name, target = $.isArray(obj) ? [] : {}, value; 
  for(name in obj){ 
     value = obj[name]; 
     if(value === obj) {
        continue;
     }
     if(deep && ($.isArray(value) || $.isObject(value))){
       target[name] = copy(value,deep);
     }else{
       target[name] = value;
     } 
  } 
  return target;
}
