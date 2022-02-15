import { chatStore } from "../store.js"
import { PVueComponent } from "../utils.js"

type MessageListProps = {
  bindMessageListRef: (ref: HTMLDivElement) => void
}

export const MessageList: PVueComponent<MessageListProps> = props => {
  return {
    ...props,
    $template: '#message-list',
    chatStore,
    mounted() {
      props.bindMessageListRef?.((this as any).$refs?.messagesWrapperRef)
    }
  }
}
