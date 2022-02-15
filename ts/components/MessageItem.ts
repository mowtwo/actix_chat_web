import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type MessageItemProps = {}

export const MessageItem: PVueComponent<MessageItemProps> = (props = {}) => {
  return {
    ...props,
    $template: '#message-item',
    chatStore
  }
}
