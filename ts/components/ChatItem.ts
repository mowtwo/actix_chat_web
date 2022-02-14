import { PVueComponent } from "../utils.js"

export type ChatItemProps = {
  avatar: string
  nickname: string
  id: string
  lastModify: Date
  lastMessage: string
}

export const ChatItem: PVueComponent<ChatItemProps> = props => {
  return {
    ...props,
    $template: '#chat-item',
  }
}
