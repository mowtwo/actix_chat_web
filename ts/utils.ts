// @ts-ignore
import { createApp as _createApp, reactive as _reactive, nextTick as _nextTick } from 'https://unpkg.com/petite-vue?module'
import type { CreateAppFn, NextTickFn, ReactiveFn } from "./types/index"
export const createApp = _createApp as CreateAppFn
export const reactive = _reactive as ReactiveFn
export const nextTick = _nextTick as NextTickFn

export type PVueComponentResult<Self> = {
  mounted?(this: Self): void
  unmounted?(this: Self): void
  '$template'?: string
}
export type PVueComponent<T> = (props: T) => PVueComponentResult<T>