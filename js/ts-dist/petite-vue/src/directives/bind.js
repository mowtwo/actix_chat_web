import { normalizeClass, normalizeStyle, isString, isArray, hyphenate, camelize } from '@vue/shared';
var forceAttrRE = /^(spellcheck|draggable|form|list|type)$/;
export var bind = function (_a) {
    var el = _a.el, get = _a.get, effect = _a.effect, arg = _a.arg, modifiers = _a.modifiers;
    var prevValue;
    // record static class
    if (arg === 'class') {
        el._class = el.className;
    }
    effect(function () {
        var value = get();
        if (arg) {
            if (modifiers === null || modifiers === void 0 ? void 0 : modifiers.camel) {
                arg = camelize(arg);
            }
            setProp(el, arg, value, prevValue);
        }
        else {
            for (var key in value) {
                setProp(el, key, value[key], prevValue && prevValue[key]);
            }
            for (var key in prevValue) {
                if (!value || !(key in value)) {
                    setProp(el, key, null);
                }
            }
        }
        prevValue = value;
    });
};
var setProp = function (el, key, value, prevValue) {
    if (key === 'class') {
        el.setAttribute('class', normalizeClass(el._class ? [el._class, value] : value) || '');
    }
    else if (key === 'style') {
        value = normalizeStyle(value);
        var style = el.style;
        if (!value) {
            el.removeAttribute('style');
        }
        else if (isString(value)) {
            if (value !== prevValue)
                style.cssText = value;
        }
        else {
            for (var key_1 in value) {
                setStyle(style, key_1, value[key_1]);
            }
            if (prevValue && !isString(prevValue)) {
                for (var key_2 in prevValue) {
                    if (value[key_2] == null) {
                        setStyle(style, key_2, '');
                    }
                }
            }
        }
    }
    else if (!(el instanceof SVGElement) &&
        key in el &&
        !forceAttrRE.test(key)) {
        // @ts-ignore
        el[key] = value;
        if (key === 'value') {
            // @ts-ignore
            el._value = value;
        }
    }
    else {
        // special case for <input v-model type="checkbox"> with
        // :true-value & :false-value
        // store value as dom properties since non-string values will be
        // stringified.
        if (key === 'true-value') {
            ;
            el._trueValue = value;
        }
        else if (key === 'false-value') {
            ;
            el._falseValue = value;
        }
        else if (value != null) {
            el.setAttribute(key, value);
        }
        else {
            el.removeAttribute(key);
        }
    }
};
var importantRE = /\s*!important$/;
var setStyle = function (style, name, val) {
    if (isArray(val)) {
        val.forEach(function (v) { return setStyle(style, name, v); });
    }
    else {
        if (name.startsWith('--')) {
            // custom property definition
            style.setProperty(name, val);
        }
        else {
            if (importantRE.test(val)) {
                // !important
                style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
            }
            else {
                style[name] = val;
            }
        }
    }
};
