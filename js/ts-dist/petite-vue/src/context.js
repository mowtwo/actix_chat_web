var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { effect as rawEffect, reactive } from '@vue/reactivity';
import { queueJob } from './scheduler';
import { inOnce } from './walk';
export var createContext = function (parent) {
    var ctx = __assign(__assign({ delimiters: ['{{', '}}'], delimitersRE: /\{\{([^]+?)\}\}/g }, parent), { scope: parent ? parent.scope : reactive({}), dirs: parent ? parent.dirs : {}, effects: [], blocks: [], cleanups: [], effect: function (fn) {
            if (inOnce) {
                queueJob(fn);
                return fn;
            }
            var e = rawEffect(fn, {
                scheduler: function () { return queueJob(e); }
            });
            ctx.effects.push(e);
            return e;
        } });
    return ctx;
};
export var createScopedContext = function (ctx, data) {
    if (data === void 0) { data = {}; }
    var parentScope = ctx.scope;
    var mergedScope = Object.create(parentScope);
    Object.defineProperties(mergedScope, Object.getOwnPropertyDescriptors(data));
    mergedScope.$refs = Object.create(parentScope.$refs);
    var reactiveProxy = reactive(new Proxy(mergedScope, {
        set: function (target, key, val, receiver) {
            // when setting a property that doesn't exist on current scope,
            // do not create it on the current scope and fallback to parent scope.
            if (receiver === reactiveProxy && !target.hasOwnProperty(key)) {
                return Reflect.set(parentScope, key, val);
            }
            return Reflect.set(target, key, val, receiver);
        }
    }));
    bindContextMethods(reactiveProxy);
    return __assign(__assign({}, ctx), { scope: reactiveProxy });
};
export var bindContextMethods = function (scope) {
    for (var _i = 0, _a = Object.keys(scope); _i < _a.length; _i++) {
        var key = _a[_i];
        if (typeof scope[key] === 'function') {
            scope[key] = scope[key].bind(scope);
        }
    }
};
