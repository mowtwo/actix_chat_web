var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { reactive } from '@vue/reactivity';
import { Block } from './block';
import { bindContextMethods, createContext } from './context';
import { toDisplayString } from './directives/text';
import { nextTick } from './scheduler';
var escapeRegex = function (str) {
    return str.replace(/[-.*+?^${}()|[\]\/\\]/g, '\\$&');
};
export var createApp = function (initialData) {
    // root context
    var ctx = createContext();
    if (initialData) {
        ctx.scope = reactive(initialData);
        bindContextMethods(ctx.scope);
        // handle custom delimiters
        if (initialData.$delimiters) {
            var _a = (ctx.delimiters = initialData.$delimiters), open_1 = _a[0], close_1 = _a[1];
            ctx.delimitersRE = new RegExp(escapeRegex(open_1) + '([^]+?)' + escapeRegex(close_1), 'g');
        }
    }
    // global internal helpers
    ctx.scope.$s = toDisplayString;
    ctx.scope.$nextTick = nextTick;
    ctx.scope.$refs = Object.create(null);
    var rootBlocks;
    return {
        directive: function (name, def) {
            if (def) {
                ctx.dirs[name] = def;
                return this;
            }
            else {
                return ctx.dirs[name];
            }
        },
        mount: function (el) {
            if (typeof el === 'string') {
                el = document.querySelector(el);
                if (!el) {
                    import.meta.env.DEV &&
                        console.error("selector " + el + " has no matching element.");
                    return;
                }
            }
            el = el || document.documentElement;
            var roots;
            if (el.hasAttribute('v-scope')) {
                roots = [el];
            }
            else {
                roots = __spreadArray([], el.querySelectorAll("[v-scope]"), true).filter(function (root) { return !root.matches("[v-scope] [v-scope]"); });
            }
            if (!roots.length) {
                roots = [el];
            }
            if (import.meta.env.DEV &&
                roots.length === 1 &&
                roots[0] === document.documentElement) {
                console.warn("Mounting on documentElement - this is non-optimal as petite-vue " +
                    "will be forced to crawl the entire page's DOM. " +
                    "Consider explicitly marking elements controlled by petite-vue " +
                    "with `v-scope`.");
            }
            rootBlocks = roots.map(function (el) { return new Block(el, ctx, true); });
            return this;
        },
        unmount: function () {
            rootBlocks.forEach(function (block) { return block.teardown(); });
        }
    };
};
