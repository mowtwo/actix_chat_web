import { generateFromString } from "../libs/generate-avatar/index.js"
import { chatStore, userStore } from "../store.js"
import { PVueComponent, PVueComponentResult, UserInfo, uuidv4 } from "../utils.js"

type AppProps = {}
type GetInfo = {
  nickname: string
  email: string
}

const getEmail = (infoDest: GetInfo) => {
  const emailReg = /[a-zA-Z0-1\+\-\_\^\%\$]+\@[a-zA-Z0-1\+\-\_\^\%\$]+\.com/
  let title = '请输入邮箱'
  while (true) {
    const email = prompt(title, '')
    if (!emailReg.test(email)) {
      title = '邮箱格式不正确，请重新输入邮箱'
      continue
    }
    infoDest.email = email
    return
  }
}
const getNickName = (infoDest: GetInfo) => {
  let title = '请输入昵称'
  while (true) {
    const nickname = prompt(title, '')
    if (nickname === '') {
      title = '昵称不能为空，请输入昵称'
      continue
    }
    infoDest.nickname = nickname
    return
  }
}

const save_user_info_key = '@chat-room/user_info'

const initUserInfo = (getInfo: GetInfo) => {
  userStore.nickname = getInfo.nickname
  userStore.email = getInfo.email
  const uuid = uuidv4()
  userStore.id = uuid
  const avatar_data = generateFromString(`${uuid}:${getInfo.nickname}:${getInfo.email}`)
  userStore.avatar = `data:image/svg+xml;utf8,${avatar_data}`
  const saveJson = { ...userStore }
  localStorage.setItem(save_user_info_key, JSON.stringify(saveJson))
}

const init_app = () => {
  const getFromUser: GetInfo = { nickname: '', email: '' }
  getEmail(getFromUser)
  getNickName(getFromUser)
  initUserInfo(getFromUser)
}

const try_restore_info = () => {
  const save_info_str = localStorage.getItem(save_user_info_key)
  if (!save_info_str) {
    init_app()
  }
  try {
    const json_obj = JSON.parse(save_info_str) as UserInfo
    if (!json_obj.id || !json_obj.nickname || !json_obj.email) {
      throw new Error()
    }
    if (!json_obj.avatar) {
      const avatar_data = generateFromString(`${json_obj.id}:${json_obj.nickname}:${json_obj.email}`)
      json_obj.avatar = `data:image/svg+xml;utf8,${avatar_data}`
    }
    userStore.id = json_obj.id
    userStore.nickname = json_obj.nickname
    userStore.email = json_obj.email
    userStore.avatar = json_obj.avatar
  } catch {
    console.warn('数据还原失败')
    init_app()
  }
}

export const App: PVueComponent<AppProps> = (props = {}) => {
  return {
    ...props,
    userStore,
    chatStore,
    leftMinize: false,
    searchInput() { },
    appProxyContextMenu(e: PointerEvent) {
      e.preventDefault()
    },
    mounted() {
      setTimeout(() => {
        const user_info_str = localStorage.getItem(save_user_info_key)
        if (user_info_str) {
          try_restore_info()
        } else {
          init_app()
        }
      }, 1000);
    }
  } as PVueComponentResult<AppProps>
}