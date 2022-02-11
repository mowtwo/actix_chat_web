import { Block } from '../block';
import { evaluate } from '../eval';
import { checkAttr } from '../utils';
export var _if = function (el, exp, ctx) {
    if (import.meta.env.DEV && !exp.trim()) {
        console.warn("v-if expression cannot be empty.");
    }
    var parent = el.parentElement;
    var anchor = new Comment('v-if');
    parent.insertBefore(anchor, el);
    var branches = [
        {
            exp: exp,
            el: el
        }
    ];
    // locate else branch
    var elseEl;
    var elseExp;
    while ((elseEl = el.nextElementSibling)) {
        elseExp = null;
        if (checkAttr(elseEl, 'v-else') === '' ||
            (elseExp = checkAttr(elseEl, 'v-else-if'))) {
            parent.removeChild(elseEl);
            branches.push({ exp: elseExp, el: elseEl });
        }
        else {
            break;
        }
    }
    var nextNode = el.nextSibling;
    parent.removeChild(el);
    var block;
    var activeBranchIndex = -1;
    var removeActiveBlock = function () {
        if (block) {
            parent.insertBefore(anchor, block.el);
            block.remove();
            block = undefined;
        }
    };
    ctx.effect(function () {
        for (var i = 0; i < branches.length; i++) {
            var _a = branches[i], exp_1 = _a.exp, el_1 = _a.el;
            if (!exp_1 || evaluate(ctx.scope, exp_1)) {
                if (i !== activeBranchIndex) {
                    removeActiveBlock();
                    block = new Block(el_1, ctx);
                    block.insert(parent, anchor);
                    parent.removeChild(anchor);
                    activeBranchIndex = i;
                }
                return;
            }
        }
        // no matched branch.
        activeBranchIndex = -1;
        removeActiveBlock();
    });
    return nextNode;
};
