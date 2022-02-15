import { userStore } from "../store.js"
import { ChatMessage, PVueComponent } from "../utils.js"

type MessageItemProps = ChatMessage

export const MessageItem: PVueComponent<MessageItemProps> = props => {
  return {
    ...props,
    $template: '#message-item',
    userStore
  }
}
