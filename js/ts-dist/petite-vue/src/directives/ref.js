export var ref = function (_a) {
    var el = _a.el, $refs = _a.ctx.scope.$refs, get = _a.get, effect = _a.effect;
    var prevRef;
    effect(function () {
        var ref = get();
        $refs[ref] = el;
        if (prevRef && ref !== prevRef) {
            delete $refs[prevRef];
        }
        prevRef = ref;
    });
    return function () {
        prevRef && delete $refs[prevRef];
    };
};
