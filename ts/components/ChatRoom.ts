import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type ChatRoomProps = {}

export const ChatRoom: PVueComponent<ChatRoomProps> = (props = {}) => {
  return {
    ...props,
    $template: '#chat-room',
    chatStore
  }
}
