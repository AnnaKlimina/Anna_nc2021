// Реализовать функцию deferred

function deferred() {
	return {
		resolve: function (val) {
    	this.state = "fulfilled";
      this.result = val;
    },
    
		then: function (callback) {
    	if (this.state == "fulfilled"){ callback(this.result);
      this.state = "pending";
      return;
      }
    	setTimeout(this.then.bind(this),100,callback);
    }
	};
}


// Тест #1
var foo = deferred();

foo.resolve(123);
foo.then(function (val) {
	console.log("foo.first:", val === 123, [val]); // true
});
foo.resolve(321);


// Тест #2
var bar = deferred();
bar.then(function (val) {
	console.log("bar.second:", val === "OK", val); // true
});
setTimeout(function () {
	bar.resolve("OK");
}, 100);
