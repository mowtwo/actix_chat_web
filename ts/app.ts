import { createApp } from "./utils.js"
import { App } from "./components/App.js"
import { SearchBlock } from "./components/SearchBlock.js"
import { ChatItem } from "./components/ChatItem.js"
import { ChatList } from "./components/ChatList.js"
import { MessageItem } from "./components/MessageItem.js"
import { MessageList } from "./components/MessageList.js"
import { MessageSender } from "./components/MessageSender.js"
import { ChatRoom } from "./components/ChatRoom.js"
import { EmojiPicker } from "./components/EmojiPicker.js"

createApp({
  App,
  SearchBlock,
  ChatItem,
  ChatList,
  EmojiPicker,
  MessageItem,
  MessageList,
  MessageSender,
  ChatRoom,
}).mount('#app')