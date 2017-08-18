/**
 * Performance Utils:
 */
module.exports.Performance = function() {
    this.now = require("performance-now"); //wrapper like: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
    
    this.methodExecutionTime = function(method2test, args) {
        var t_start = this.now();
        method2test.apply(this, args)
        var t_delta = this.now() - t_start;
        return t_delta;
    }
}