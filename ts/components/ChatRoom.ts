import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type ChatRoomProps = {}

export const ChatRoom: PVueComponent<ChatRoomProps> = (props = {}) => {
  return {
    ...props,
    $template: '#chat-room',
    chatStore,
    messageListRefs: null,
    onSend() {
      const messageListRefs = this.messageListRefs as HTMLDivElement
      if (messageListRefs) {
        messageListRefs.scrollTo({
          behavior: 'smooth',
          top: messageListRefs.scrollHeight - messageListRefs.scrollTop
        })
      }
    },
    bindMessageListRef(ref) {
      this.messageListRefs = ref
    }
  }
}
