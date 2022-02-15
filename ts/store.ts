import type { ChatItemProps } from "./components/ChatItem"
import { ChatRoom, reactive } from "./utils.js"

export const userStore = reactive({
  nickname: 'Mowtwo',
  avatar: 'https://img0.baidu.com/it/u=2359361020,2055583759&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
})

export const searchStore = reactive({
  searchWords: '',
})

export type ChatStoreT = {
  chatList: ChatItemProps[]
  currentUserId: string
  room?: ChatRoom
}

export const chatStore = reactive<ChatStoreT>({
  chatList: Array(100).fill(null).map((_, i) => {
    return {
      avatar: 'https://img0.baidu.com/it/u=2359361020,2055583759&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
      id: i.toString(),
      nickname: 'Mowtwo',
      lastModify: new Date(),
      lastMessage: '测试对话内容'
    }
  }),
  currentUserId: '1',
  room: {
    name: 'test',
    id: '1',
    message: [
      {
        type: 'text',
        date: new Date(),
        text: 'test balabala',
        from: {
          avatar: 'https://img0.baidu.com/it/u=2359361020,2055583759&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
          id: '1',
          nickname: 'Mowtwo',
        }
      }
    ]
  }
})