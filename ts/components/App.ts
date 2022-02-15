import { chatStore, userStore } from "../store.js"
import type { PVueComponent, PVueComponentResult } from "../utils.js"

type AppProps = {}
export const App: PVueComponent<AppProps> = (props = {}) => {
  return {
    ...props,
    userStore,
    chatStore,
    leftMinize: false,
    appProxyContextMenu(e: PointerEvent) {
      e.preventDefault()
    },
    searchInput() { }
  } as PVueComponentResult<AppProps>
}