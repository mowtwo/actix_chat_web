var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { builtInDirectives } from './directives';
import { _if } from './directives/if';
import { _for } from './directives/for';
import { bind } from './directives/bind';
import { on } from './directives/on';
import { text } from './directives/text';
import { evaluate } from './eval';
import { checkAttr } from './utils';
import { ref } from './directives/ref';
import { createScopedContext } from './context';
var dirRE = /^(?:v-|:|@)/;
var modifierRE = /\.([\w-]+)/g;
export var inOnce = false;
export var walk = function (node, ctx) {
    var type = node.nodeType;
    if (type === 1) {
        // Element
        var el = node;
        if (el.hasAttribute('v-pre')) {
            return;
        }
        checkAttr(el, 'v-cloak');
        var exp = void 0;
        // v-if
        if ((exp = checkAttr(el, 'v-if'))) {
            return _if(el, exp, ctx);
        }
        // v-for
        if ((exp = checkAttr(el, 'v-for'))) {
            return _for(el, exp, ctx);
        }
        // v-scope
        if ((exp = checkAttr(el, 'v-scope')) || exp === '') {
            var scope = exp ? evaluate(ctx.scope, exp) : {};
            ctx = createScopedContext(ctx, scope);
            if (scope.$template) {
                resolveTemplate(el, scope.$template);
            }
        }
        // v-once
        var hasVOnce = checkAttr(el, 'v-once') != null;
        if (hasVOnce) {
            inOnce = true;
        }
        // ref
        if ((exp = checkAttr(el, 'ref'))) {
            applyDirective(el, ref, "\"" + exp + "\"", ctx);
        }
        // process children first before self attrs
        walkChildren(el, ctx);
        // other directives
        var deferred = [];
        for (var _i = 0, _a = __spreadArray([], el.attributes, true); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b.name, value = _b.value;
            if (dirRE.test(name_1) && name_1 !== 'v-cloak') {
                if (name_1 === 'v-model') {
                    // defer v-model since it relies on :value bindings to be processed
                    // first, but also before v-on listeners (#73)
                    deferred.unshift([name_1, value]);
                }
                else if (name_1[0] === '@' || /^v-on\b/.test(name_1)) {
                    deferred.push([name_1, value]);
                }
                else {
                    processDirective(el, name_1, value, ctx);
                }
            }
        }
        for (var _c = 0, deferred_1 = deferred; _c < deferred_1.length; _c++) {
            var _d = deferred_1[_c], name_2 = _d[0], value = _d[1];
            processDirective(el, name_2, value, ctx);
        }
        if (hasVOnce) {
            inOnce = false;
        }
    }
    else if (type === 3) {
        // Text
        var data = node.data;
        if (data.includes(ctx.delimiters[0])) {
            var segments = [];
            var lastIndex = 0;
            var match = void 0;
            while ((match = ctx.delimitersRE.exec(data))) {
                var leading = data.slice(lastIndex, match.index);
                if (leading)
                    segments.push(JSON.stringify(leading));
                segments.push("$s(" + match[1] + ")");
                lastIndex = match.index + match[0].length;
            }
            if (lastIndex < data.length) {
                segments.push(JSON.stringify(data.slice(lastIndex)));
            }
            applyDirective(node, text, segments.join('+'), ctx);
        }
    }
    else if (type === 11) {
        walkChildren(node, ctx);
    }
};
var walkChildren = function (node, ctx) {
    var child = node.firstChild;
    while (child) {
        child = walk(child, ctx) || child.nextSibling;
    }
};
var processDirective = function (el, raw, exp, ctx) {
    var dir;
    var arg;
    var modifiers;
    // modifiers
    raw = raw.replace(modifierRE, function (_, m) {
        ;
        (modifiers || (modifiers = {}))[m] = true;
        return '';
    });
    if (raw[0] === ':') {
        dir = bind;
        arg = raw.slice(1);
    }
    else if (raw[0] === '@') {
        dir = on;
        arg = raw.slice(1);
    }
    else {
        var argIndex = raw.indexOf(':');
        var dirName = argIndex > 0 ? raw.slice(2, argIndex) : raw.slice(2);
        dir = builtInDirectives[dirName] || ctx.dirs[dirName];
        arg = argIndex > 0 ? raw.slice(argIndex + 1) : undefined;
    }
    if (dir) {
        if (dir === bind && arg === 'ref')
            dir = ref;
        applyDirective(el, dir, exp, ctx, arg, modifiers);
        el.removeAttribute(raw);
    }
    else if (import.meta.env.DEV) {
        console.error("unknown custom directive " + raw + ".");
    }
};
var applyDirective = function (el, dir, exp, ctx, arg, modifiers) {
    var get = function (e) {
        if (e === void 0) { e = exp; }
        return evaluate(ctx.scope, e, el);
    };
    var cleanup = dir({
        el: el,
        get: get,
        effect: ctx.effect,
        ctx: ctx,
        exp: exp,
        arg: arg,
        modifiers: modifiers
    });
    if (cleanup) {
        ctx.cleanups.push(cleanup);
    }
};
var resolveTemplate = function (el, template) {
    if (template[0] === '#') {
        var templateEl = document.querySelector(template);
        if (import.meta.env.DEV && !templateEl) {
            console.error("template selector " + template + " has no matching <template> element.");
        }
        el.appendChild(templateEl.content.cloneNode(true));
        return;
    }
    el.innerHTML = template;
};
