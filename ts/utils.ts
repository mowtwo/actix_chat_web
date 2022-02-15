// @ts-ignore
import { createApp as _createApp, reactive as _reactive, nextTick as _nextTick } from 'https://unpkg.com/petite-vue?module'
import { ChatItemProps } from './components/ChatItem'
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

export interface IMessageMeta {
  date: Date
  from: Omit<ChatItemProps, 'lastModify' | 'lastMessage'>
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