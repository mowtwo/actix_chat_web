import { chatStore, searchStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type ChatItemProps = {}

export const ChatList: PVueComponent<ChatItemProps> = (props = {}) => {
  return {
    ...props,
    $template: '#chat-list',
    chatStore,
    searchStore
  }
}
