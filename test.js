var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var utils = require('./utils.js');

describe('performance utils', function() {
    it('performance.now() functional test', function() {
        var performance = new utils.Performance();
        var t = performance.now();
        expect(typeof(t)).to.equal("number");
        expect(t).to.be.below(performance.now());
    });
    it('performance.methodExecutionTime() functional test', function() {
        var deviation_p = 10.0;
        var performance = new utils.Performance();
        var testFunction = function(a, b, c) {
            expect(a).to.equal("arg");
            expect(b).to.equal(133);
            expect(c).to.equal(1.1);
            
            //do some useless stuff:
            for(var i=0;i<1000000;i++) {
                b--;
            }
        }
        var firstrun = performance.methodExecutionTime(testFunction, ["arg", 133, 1.1]);
        expect(typeof(firstrun)).to.equal("number");
        firstrun = performance.methodExecutionTime(testFunction, ["arg", 133, 1.1]); //Rerun first meassure couse of optimications
        var secondrun = performance.methodExecutionTime(testFunction, ["arg", 133, 1.1]);
        var percent = firstrun * deviation_p / 100.0;
        console.log("    I accepted deviation: +-"+deviation_p+"%% = +-"+percent+"ms");
        expect(secondrun).to.be.within(firstrun-percent, firstrun+percent);
    });
});