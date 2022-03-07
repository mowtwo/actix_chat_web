import { generateFromString } from "../libs/generate-avatar/index.js"
import { chatStore, userStore } from "../store.js"
import { PVueComponent, PVueComponentResult, UserInfo, getWsConn, parseWsResp, WsRespUserInfoData } from "../utils.js"

type AppProps = {}
type GetInfo = {
  nickname: string
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
      getNickName(userStore)
      const ws = getWsConn(userStore.nickname)
      ws.addEventListener('message', e => {
        const resp = e.data as string
        const respObj = parseWsResp(resp)
        const userinfo = JSON.parse(respObj.data) as WsRespUserInfoData
        userStore.id = userinfo.id
        userStore.nickname = userinfo.nickname
        userStore.avatar = 'data:image/svg+xml;utf8,' + generateFromString(`${userStore.id}::${userStore.nickname}`)
      })
    }
  } as PVueComponentResult<AppProps>
}