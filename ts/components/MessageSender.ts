import { chatStore, userStore } from "../store.js"
import { nextTick, PVueComponent } from "../utils.js"

type MessageSenderProps = {
  onSend: () => void
  maxLength: number
}

export const MessageSender: PVueComponent<MessageSenderProps> = props => {
  return {
    ...props,
    maxLength: props.maxLength ?? 400,
    $template: '#message-sender',
    chatStore,
    tempInput: '',
    editInput(e: InputEvent) {
      this.tempInput = (e.target as HTMLDivElement).innerText
    },
    hackPaste(e: ClipboardEvent) {
      e.preventDefault()
      const text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
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
        if ((this.tempInput as string).trim().length > this.maxLength) {
          alert('输入文本内容超出最长限制')
          return
        }
        chatStore.room.message.push({
          id: Date.now().toString(),
          type: 'text',
          text: this.tempInput,
          date: new Date(),
          from: {
            ...userStore,
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
