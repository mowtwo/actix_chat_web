import { createApp } from './app';

export { createApp } from './app';
export { nextTick } from './scheduler';
// @ts-ignore
export { reactive } from '@vue/reactivity';

export declare type CreateAppFn = typeof createApp