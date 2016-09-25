var Emitter = function () {
    this.module = {};
};

Emitter.prototype = {
    constructor : Emitter,
    on : function (event, fun) {
        var list = (this.module[event]) ? this.module[event] : (this.module[event] = []);
        return list.push(fun);
    },
    fire : function () {
        var event = Array.prototype.shift.call(arguments);
        var list = this.module[event] || [];
        for (var i= 0, len = list.length; i < len; i++) {
            var fun = list[i];
            if (fun.apply(this, arguments) === false) {
                return false;
            }
        }
    }
};

var Promise = function () {
    Emitter.call(this);
};

Promise.prototype = new Emitter();
Promise.constructor = Promise;

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.on('success',fulfilledHandler);
    }
    if (typeof errorHandler === 'function') {
        this.on('error',errorHandler);
    }
    if(typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }
};

var Deferred = function () {
    this.state = 'unfilfilled';
    this.promise = new Promise();
};

Deferred.prototype = {
    constructor : Deferred,
    resolve : function (obj) {
        this.state = 'fulfilled';
        this.promise.fire('success', obj);
    },
    reject : function (err) {
        this.state = 'failed';
        this.promise.fire('error', err);
    },
    progress : function (data) {
        this.promise.fire('progress', data);
    }
};

module.exports = {
    Emitter: Emitter,
    Promise: Promise,
    Deferred: Deferred
}