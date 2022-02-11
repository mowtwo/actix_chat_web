import { isObject } from '@vue/shared';
export var text = function (_a) {
    var el = _a.el, get = _a.get, effect = _a.effect;
    effect(function () {
        el.textContent = toDisplayString(get());
    });
};
export var toDisplayString = function (value) {
    return value == null
        ? ''
        : isObject(value)
            ? JSON.stringify(value, null, 2)
            : String(value);
};
