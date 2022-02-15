import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type MessageSenderProps = {}

export const MessageSender: PVueComponent<MessageSenderProps> = (props = {}) => {
  return {
    ...props,
    $template: '#message-sender',
    chatStore,
    tempInput: '',
    editInput(e: InputEvent) {
      this.tempInput = (e.target as HTMLDivElement).innerText
    }
  }
}
