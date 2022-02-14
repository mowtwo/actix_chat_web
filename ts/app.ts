import { createApp } from "./utils.js"
import { App } from "./components/App.js"
import { SearchBlock } from "./components/SearchBlock.js"
import { ChatItem } from "./components/ChatItem.js"
import { ChatList } from "./components/ChatList.js"

createApp({
  App,
  SearchBlock,
  ChatItem,
  ChatList
}).mount('#app')