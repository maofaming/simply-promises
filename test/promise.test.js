var promise = require('../lib/promise');
var expect = require('chai').expect;

describe('测试观察者方法emitter', function () {
    var emitter = new promise.Emitter();
    var message = 'ok';

    it('监听', function () {
        var callback = function (key) {
            // console.log(key === message);
            expect(key).to.be.equal(message);
        };
         emitter.on('test', callback);

    });

    it('发送消息', function () {
         emitter.fire('test', message);
    });
});

describe('测试promise方法', function () {
    var successMsg = 'ok';
    var errorMsg = 'error';
    var finishMsg = 'finish';

    function Asyn(type) {
        var promiseInstance = new promise.Deferred();
        setTimeout(function () {
            if (type === 'success') {
                promiseInstance.resolve(successMsg);
            } else if (type === 'error') {
                promiseInstance.reject(errorMsg);
            } else {
                promiseInstance.progress(finishMsg);
            }
        }, 500);
        return promiseInstance.promise;
    }
    
    function testType(type, done) {
        Asyn(type).then(function (success) {
            expect(success).to.be.equal(successMsg);
            done();
        }, function (error) {
            expect(error).to.be.equal(errorMsg);
            done();
        }, function (finish) {
            expect(finish).to.be.equal(finishMsg);
            done();
        })
    }
    
    it('异步触发成功', function (done) {
        testType('success', done);
    });

    it('异步触发失败', function (done) {
        testType('error', done);
    });

    it('异步触发过程', function (done) {
        testType('', done);
    });
});