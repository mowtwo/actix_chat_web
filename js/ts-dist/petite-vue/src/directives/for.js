import { isArray, isObject } from '@vue/shared';
import { Block } from '../block';
import { evaluate } from '../eval';
import { createScopedContext } from '../context';
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var destructureRE = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/;
export var _for = function (el, exp, ctx) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
        import.meta.env.DEV && console.warn("invalid v-for expression: " + exp);
        return;
    }
    var nextNode = el.nextSibling;
    var parent = el.parentElement;
    var anchor = new Text('');
    parent.insertBefore(anchor, el);
    parent.removeChild(el);
    var sourceExp = inMatch[2].trim();
    var valueExp = inMatch[1].trim().replace(stripParensRE, '').trim();
    var destructureBindings;
    var isArrayDestructure = false;
    var indexExp;
    var objIndexExp;
    var keyAttr = 'key';
    var keyExp = el.getAttribute(keyAttr) ||
        el.getAttribute((keyAttr = ':key')) ||
        el.getAttribute((keyAttr = 'v-bind:key'));
    if (keyExp) {
        el.removeAttribute(keyAttr);
        if (keyAttr === 'key')
            keyExp = JSON.stringify(keyExp);
    }
    var match;
    if ((match = valueExp.match(forIteratorRE))) {
        valueExp = valueExp.replace(forIteratorRE, '').trim();
        indexExp = match[1].trim();
        if (match[2]) {
            objIndexExp = match[2].trim();
        }
    }
    if ((match = valueExp.match(destructureRE))) {
        destructureBindings = match[1].split(',').map(function (s) { return s.trim(); });
        isArrayDestructure = valueExp[0] === '[';
    }
    var mounted = false;
    var blocks;
    var childCtxs;
    var keyToIndexMap;
    var createChildContexts = function (source) {
        var map = new Map();
        var ctxs = [];
        if (isArray(source)) {
            for (var i = 0; i < source.length; i++) {
                ctxs.push(createChildContext(map, source[i], i));
            }
        }
        else if (typeof source === 'number') {
            for (var i = 0; i < source; i++) {
                ctxs.push(createChildContext(map, i + 1, i));
            }
        }
        else if (isObject(source)) {
            var i = 0;
            for (var key in source) {
                ctxs.push(createChildContext(map, source[key], i++, key));
            }
        }
        return [ctxs, map];
    };
    var createChildContext = function (map, value, index, objKey) {
        var data = {};
        if (destructureBindings) {
            destructureBindings.forEach(function (b, i) { return (data[b] = value[isArrayDestructure ? i : b]); });
        }
        else {
            data[valueExp] = value;
        }
        if (objKey) {
            indexExp && (data[indexExp] = objKey);
            objIndexExp && (data[objIndexExp] = index);
        }
        else {
            indexExp && (data[indexExp] = index);
        }
        var childCtx = createScopedContext(ctx, data);
        var key = keyExp ? evaluate(childCtx.scope, keyExp) : index;
        map.set(key, index);
        childCtx.key = key;
        return childCtx;
    };
    var mountBlock = function (ctx, ref) {
        var block = new Block(el, ctx);
        block.key = ctx.key;
        block.insert(parent, ref);
        return block;
    };
    ctx.effect(function () {
        var _a;
        var source = evaluate(ctx.scope, sourceExp);
        var prevKeyToIndexMap = keyToIndexMap;
        _a = createChildContexts(source), childCtxs = _a[0], keyToIndexMap = _a[1];
        if (!mounted) {
            blocks = childCtxs.map(function (s) { return mountBlock(s, anchor); });
            mounted = true;
        }
        else {
            for (var i_1 = 0; i_1 < blocks.length; i_1++) {
                if (!keyToIndexMap.has(blocks[i_1].key)) {
                    blocks[i_1].remove();
                }
            }
            var nextBlocks = [];
            var i = childCtxs.length;
            var nextBlock = void 0;
            var prevMovedBlock = void 0;
            while (i--) {
                var childCtx = childCtxs[i];
                var oldIndex = prevKeyToIndexMap.get(childCtx.key);
                var block = void 0;
                if (oldIndex == null) {
                    // new
                    block = mountBlock(childCtx, nextBlock ? nextBlock.el : anchor);
                }
                else {
                    // update
                    block = blocks[oldIndex];
                    Object.assign(block.ctx.scope, childCtx.scope);
                    if (oldIndex !== i) {
                        // moved
                        if (blocks[oldIndex + 1] !== nextBlock ||
                            // If the next has moved, it must move too
                            prevMovedBlock === nextBlock) {
                            prevMovedBlock = block;
                            block.insert(parent, nextBlock ? nextBlock.el : anchor);
                        }
                    }
                }
                nextBlocks.unshift(nextBlock = block);
            }
            blocks = nextBlocks;
        }
    });
    return nextNode;
};
