var evalCache = Object.create(null);
export var evaluate = function (scope, exp, el) {
    return execute(scope, "return(" + exp + ")", el);
};
export var execute = function (scope, exp, el) {
    var fn = evalCache[exp] || (evalCache[exp] = toFunction(exp));
    try {
        return fn(scope, el);
    }
    catch (e) {
        if (import.meta.env.DEV) {
            console.warn("Error when evaluating expression \"" + exp + "\":");
        }
        console.error(e);
    }
};
var toFunction = function (exp) {
    try {
        return new Function("$data", "$el", "with($data){" + exp + "}");
    }
    catch (e) {
        console.error(e.message + " in expression: " + exp);
        return function () { };
    }
};
