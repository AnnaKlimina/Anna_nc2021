//задача с занятия 17 февраля 
function Futures(executor) {
	let obj = {
  	state: "pending"
  };
  Object.setPrototypeOf(obj, Futures.prototype);
  
	let resolve = function(val){
  if(obj.state == "pending"){
  	obj.result = val;
    obj.state = "fulfilled";
    }
    throw "stop";
  }
  
  let reject = function(error){
  	if(obj.state == "pending"){
    obj.result = new Error(error);  
    obj.state = "rejected";
    }
  	throw "stop";
  }
  
  try{
  executor(resolve,reject);
  } finally {
  setTimeout( window.onerror = (message, source, lineno, colno, error) => {
  	if (error != "stop" && error !== undefined) {
  		console.log(error.message);
  	}
  }, 1000);
  	return obj;
  }

}

Futures.prototype.then = function(){
setTimeout(()=>{
	if (this.state == "rejected" && arguments.length > 1) {
  	arguments[1](this.result.message);
  } else if(this.state == "fulfilled") {
  	arguments[0](this.result);
  } else {
  	setTimeout(this.then.bind(this),100,...arguments);
  }
  }, 100);
  
};


// Тест #1
var foo = new Futures(function (resolve, reject) {
    resolve(123);
});

foo.then(function (val) {
    console.log("foo.resolved:", val === 123);
}, function () {
    console.log("foo.resolved: fail");
});


// Тест #2
var bar = new Futures(function (resolve, reject) {
    setTimeout(resolve.bind(null,"fail"),300);
    setTimeout(reject.bind(null,"ok"),200);
});


bar.then(function () {
    console.log("bar.rejected: fail");
}, function (val) {
    console.log("bar.rejected:", val === "ok");
});
