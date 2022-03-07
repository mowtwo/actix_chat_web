use super::ws_server;
use actix::Addr;

pub trait Cmd {
    fn name(&self) -> &'static str;
    fn route(addr: Addr<ws_server::WsConn>, data: String);
}

pub type RouterFn = fn(addr: Addr<ws_server::WsConn>, data: String);
