import { hyphenate } from '@vue/shared';
import { listen } from '../utils';
import { nextTick } from '../scheduler';
// same as vue 2
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
var systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
var modifierGuards = {
    stop: function (e) { return e.stopPropagation(); },
    prevent: function (e) { return e.preventDefault(); },
    self: function (e) { return e.target !== e.currentTarget; },
    ctrl: function (e) { return !e.ctrlKey; },
    shift: function (e) { return !e.shiftKey; },
    alt: function (e) { return !e.altKey; },
    meta: function (e) { return !e.metaKey; },
    left: function (e) { return 'button' in e && e.button !== 0; },
    middle: function (e) { return 'button' in e && e.button !== 1; },
    right: function (e) { return 'button' in e && e.button !== 2; },
    exact: function (e, modifiers) {
        return systemModifiers.some(function (m) { return e[m + "Key"] && !modifiers[m]; });
    }
};
export var on = function (_a) {
    var el = _a.el, get = _a.get, exp = _a.exp, arg = _a.arg, modifiers = _a.modifiers;
    if (!arg) {
        if (import.meta.env.DEV) {
            console.error("v-on=\"obj\" syntax is not supported in petite-vue.");
        }
        return;
    }
    var handler = simplePathRE.test(exp)
        ? get("(e => " + exp + "(e))")
        : get("($event => { " + exp + " })");
    // special lifecycle events
    if (import.meta.env.DEV && (arg === 'mounted' || arg === 'unmounted')) {
        console.error("mounted and unmounted hooks now need to be prefixed with vue: " +
            ("- use @vue:" + arg + "=\"handler\" instead."));
    }
    if (arg === 'vue:mounted') {
        nextTick(handler);
        return;
    }
    else if (arg === 'vue:unmounted') {
        return function () { return handler(); };
    }
    if (modifiers) {
        // map modifiers
        if (arg === 'click') {
            if (modifiers.right)
                arg = 'contextmenu';
            if (modifiers.middle)
                arg = 'mouseup';
        }
        var raw_1 = handler;
        handler = function (e) {
            if ('key' in e && !(hyphenate(e.key) in modifiers)) {
                return;
            }
            for (var key in modifiers) {
                var guard = modifierGuards[key];
                if (guard && guard(e, modifiers)) {
                    return;
                }
            }
            return raw_1(e);
        };
    }
    listen(el, arg, handler, modifiers);
};
