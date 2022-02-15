import { chatStore, userStore } from "../store.js"
import { nextTick, PVueComponent } from "../utils.js"

type MessageSenderProps = {
  onSend: () => void
}

export const MessageSender: PVueComponent<MessageSenderProps> = props => {
  return {
    ...props,
    $template: '#message-sender',
    chatStore,
    tempInput: '',
    editInput(e: InputEvent) {
      this.tempInput = (e.target as HTMLDivElement).innerText
    },
    withCtrlEnter(e: KeyboardEvent) {
      if (e.ctrlKey) {
        e.preventDefault()
        const textarea = this.$refs?.textareaRef as HTMLDivElement
        if ((this.tempInput as string).trim() === '') {
          this.tempInput = ''
          if (textarea) {
            textarea.innerHTML = ''
          }
          return
        }
        chatStore.room.message.push({
          id: Date.now().toString(),
          type: 'text',
          text: this.tempInput,
          date: new Date(),
          from: {
            ...userStore
          }
        })
        nextTick(() => {
          props.onSend?.();
        })
        this.tempInput = ''
        if (textarea) {
          textarea.innerHTML = ''
        }
      }
    }
  }
}
