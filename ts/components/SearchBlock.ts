import { searchStore } from "../store.js"
import { nextTick, PVueComponent } from "../utils.js"

type SearchBlockProps = {
  placeholder: string
  onInput: () => void
}
export const SearchBlock: PVueComponent<SearchBlockProps> = props => {
  return {
    ...props,
    $template: '#search-block',
    searchStore,
    inputFocus: false,
    nextTickBlur() {
      setTimeout(() => {
        nextTick(() => {
          this.inputFocus = false
        })
      }, 100)
    },
    handleGlobalFocusSearch(e: KeyboardEvent) {
      if ((e.ctrlKey && e.key === 'f') || e.key === '/') {
        e.preventDefault()
        this.inputFocus = true
        const input = this.$refs?.inputRef as HTMLInputElement
        if (input) {
          input.focus()
        }
      }
    },
    inputEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        searchStore.searchWords = ''
        this.inputFocus = false
        const input = this.$refs?.inputRef as HTMLInputElement
        if (input) {
          input.blur()
        }
      }
    },
    mounted() {
      document.addEventListener('keydown', (this as any).handleGlobalFocusSearch, false)
    },
    unmounted() {
      document.removeEventListener('keydown', (this as any).handleGlobalFocusSearch, false)
    }
  }
}