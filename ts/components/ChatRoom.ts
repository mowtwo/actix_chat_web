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
      const messageListInner = messageListRefs.querySelector('.messages-scroll-inner')
      if (messageListRefs) {
        // const scrollToHeight = messageListRefs.querySelector('.messages-scroll-inner')!.clientHeight - messageListRefs.scrollHeight
        // console.log(scrollToHeight)
        messageListRefs.scrollTo({
          behavior: 'smooth',
          top: messageListInner.clientHeight
        })
      }
    },
    bindMessageListRef(ref) {
      this.messageListRefs = ref
    }
  }
}
