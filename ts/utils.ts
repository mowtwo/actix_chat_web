// @ts-ignore
import { createApp as _createApp, reactive as _reactive, nextTick as _nextTick } from 'https://unpkg.com/petite-vue?module'
// @ts-ignore
import type { ChatItemProps } from './components/ChatItem'
import type { CreateAppFn, NextTickFn, ReactiveFn } from "./types/pvue/index"
export const createApp = _createApp as CreateAppFn
export const reactive = _reactive as ReactiveFn
export const nextTick = _nextTick as NextTickFn

export type PVueComponentResult<Self> = {
  mounted?(this: Self): void
  unmounted?(this: Self): void
  '$template'?: string
}
export type PVueComponent<T> = (props: T) => PVueComponentResult<T>

export type UserInfo = Omit<ChatItemProps, 'lastModify' | 'lastMessage'>

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

export type WsResp = {
  cmd: string
  data: string
}

export type WsRespUserInfoData = {
  id: string
  nickname: string
}

export const parseWsResp = (json_str: string) => JSON.parse(json_str) as WsResp

let ws_conn: WebSocket = null
export const getWsConn = (name: string) => {
  const { host, protocol } = location
  let url = `ws://${host}/ws/${name}`
  if (protocol === 'http:') {
    url = `ws://${host}/ws/${name}`
  } else {
    url = `wss://${host}/ws/${name}`
  }
  if (ws_conn) {
    return ws_conn
  }
  return ws_conn = new WebSocket(url)
}

export const parseWsData = (msg: string) => {
  const r = msg.split('')
}