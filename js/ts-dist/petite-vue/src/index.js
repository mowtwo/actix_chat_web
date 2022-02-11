export { createApp } from './app';
export { nextTick } from './scheduler';
export { reactive } from '@vue/reactivity';
import { createApp } from './app';
var s = document.currentScript;
if (s && s.hasAttribute('init')) {
    createApp().mount();
}
