// @ts-ignore
import { createApp as _createApp } from 'https://unpkg.com/petite-vue?module'
import type { CreateAppFn } from "./types/index"

const createApp = _createApp as CreateAppFn

const app = createApp({
  leftMinize: false
}).mount('#app')