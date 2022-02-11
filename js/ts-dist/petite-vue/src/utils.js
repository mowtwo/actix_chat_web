export var checkAttr = function (el, name) {
    var val = el.getAttribute(name);
    if (val != null)
        el.removeAttribute(name);
    return val;
};
export var listen = function (el, event, handler, options) {
    el.addEventListener(event, handler, options);
};
