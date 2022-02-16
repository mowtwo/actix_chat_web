// @ts-ignore
import { createApp as _createApp, reactive as _reactive, nextTick as _nextTick } from 'https://unpkg.com/petite-vue?module'
// @ts-ignore
import { v4 as _uuidv4 } from 'https://jspm.dev/uuid';
import type { v4 as uuidv4_t } from "./types/uuid/index"
import type { ChatItemProps } from './components/ChatItem'
import type { CreateAppFn, NextTickFn, ReactiveFn } from "./types/pvue/index"
export const createApp = _createApp as CreateAppFn
export const reactive = _reactive as ReactiveFn
export const nextTick = _nextTick as NextTickFn
export const uuidv4 = _uuidv4 as uuidv4_t

export type PVueComponentResult<Self> = {
  mounted?(this: Self): void
  unmounted?(this: Self): void
  '$template'?: string
}
export type PVueComponent<T> = (props: T) => PVueComponentResult<T>

export type UserInfo = Omit<ChatItemProps, 'lastModify' | 'lastMessage'> & {
  email?: string
}

export interface IMessageMeta {
  id: string
  date: Date
  from: UserInfo
}

export type TextMessage = {
  type: 'text'
  text: string
}

export type LinkMessage = {
  type: 'link'
  link: string
}

export type ChatMessage = (TextMessage | LinkMessage) & IMessageMeta

export type ChatRoom = {
  name: string
  id: string
  message: ChatMessage[]
}