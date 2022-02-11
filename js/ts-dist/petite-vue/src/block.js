import { createContext } from './context';
import { walk } from './walk';
import { remove } from '@vue/shared';
import { stop } from '@vue/reactivity';
var Block = /** @class */ (function () {
    function Block(template, parentCtx, isRoot) {
        if (isRoot === void 0) { isRoot = false; }
        this.isFragment = template instanceof HTMLTemplateElement;
        if (isRoot) {
            this.template = template;
        }
        else if (this.isFragment) {
            this.template = template.content.cloneNode(true);
        }
        else {
            this.template = template.cloneNode(true);
        }
        if (isRoot) {
            this.ctx = parentCtx;
        }
        else {
            // create child context
            this.parentCtx = parentCtx;
            parentCtx.blocks.push(this);
            this.ctx = createContext(parentCtx);
        }
        walk(this.template, this.ctx);
    }
    Object.defineProperty(Block.prototype, "el", {
        get: function () {
            return this.start || this.template;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype.insert = function (parent, anchor) {
        if (anchor === void 0) { anchor = null; }
        if (this.isFragment) {
            if (this.start) {
                // already inserted, moving
                var node = this.start;
                var next = void 0;
                while (node) {
                    next = node.nextSibling;
                    parent.insertBefore(node, anchor);
                    if (node === this.end)
                        break;
                    node = next;
                }
            }
            else {
                this.start = new Text('');
                this.end = new Text('');
                parent.insertBefore(this.end, anchor);
                parent.insertBefore(this.start, this.end);
                parent.insertBefore(this.template, this.end);
            }
        }
        else {
            parent.insertBefore(this.template, anchor);
        }
    };
    Block.prototype.remove = function () {
        if (this.parentCtx) {
            remove(this.parentCtx.blocks, this);
        }
        if (this.start) {
            var parent_1 = this.start.parentNode;
            var node = this.start;
            var next = void 0;
            while (node) {
                next = node.nextSibling;
                parent_1.removeChild(node);
                if (node === this.end)
                    break;
                node = next;
            }
        }
        else {
            this.template.parentNode.removeChild(this.template);
        }
        this.teardown();
    };
    Block.prototype.teardown = function () {
        this.ctx.blocks.forEach(function (child) {
            child.teardown();
        });
        this.ctx.effects.forEach(stop);
        this.ctx.cleanups.forEach(function (fn) { return fn(); });
    };
    return Block;
}());
export { Block };
