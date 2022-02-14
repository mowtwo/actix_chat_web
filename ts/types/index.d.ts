import { createApp } from './app';
import { nextTick } from './scheduler';
import { reactive } from './vue-reactivity';

export { createApp } from './app';
export { nextTick } from './scheduler';
// @ts-ignore
export { reactive } from './vue-reactivity';

export declare type CreateAppFn = typeof createApp
export declare type ReactiveFn = typeof reactive
export declare type NextTickFn = typeof nextTick