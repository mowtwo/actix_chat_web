var queued = false;
var queue = [];
var p = Promise.resolve();
export var nextTick = function (fn) { return p.then(fn); };
export var queueJob = function (job) {
    if (!queue.includes(job))
        queue.push(job);
    if (!queued) {
        queued = true;
        nextTick(flushJobs);
    }
};
var flushJobs = function () {
    for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
        var job = queue_1[_i];
        job();
    }
    queue.length = 0;
    queued = false;
};
