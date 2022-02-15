import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type MessageListProps = {}

export const MessageList: PVueComponent<MessageListProps> = (props = {}) => {
  return {
    ...props,
    $template: '#message-list',
    chatStore
  }
}
