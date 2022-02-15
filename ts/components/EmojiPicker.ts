import { PVueComponent } from "../utils.js"

type EmojiPickerProps = {}

export const EmojiPicker: PVueComponent<EmojiPickerProps> = (props = {}) => {
  return {
    ...props,
    $template: '#emoji-picker'
  }
}
