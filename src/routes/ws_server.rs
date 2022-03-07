use actix::{Actor, StreamHandler};
use actix_web::{web, HttpRequest, HttpResponse};
use actix_web_actors::ws::{self, Message, WebsocketContext};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct WsConn {
    pub id: String,
    pub nickname: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: String,
    pub nickname: String,
    pub avatar: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WsRequest {
    pub cmd: String,
    pub data: String,
}

impl WsRequest {
    pub fn new(text: &str) -> Self {
        let r: WsRequest = serde_json::from_str(text).unwrap();
        r
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WsResponse {
    pub cmd: String,
    pub data: String,
}

impl WsResponse {
    pub fn new(cmd: &str, data: String) -> Self {
        WsResponse {
            cmd: cmd.to_string(),
            data: data.to_string(),
        }
    }

    pub fn to_json_str(&self) -> String {
        serde_json::to_string(self).unwrap()
    }
}

impl Actor for WsConn {
    type Context = WebsocketContext<Self>;
    fn started(&mut self, ctx: &mut Self::Context) {
        let data = serde_json::to_string(&self).unwrap();
        let resp = WsResponse::new("userinfo", data);
        ctx.text(resp.to_json_str());
        println!("{} join,id = {}", self.nickname, self.id);
    }
    fn stopped(&mut self, _ctx: &mut Self::Context) {
        println!("{} exit", self.nickname);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WsConn {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(Message::Text(text)) => {
                let r = WsRequest::new(&text);
                println!("{:#?}", r);
            }
            Ok(Message::Ping(msg)) => ctx.pong(&msg),
            Ok(Message::Close(reason)) => ctx.close(reason),
            _ => (),
        }
    }
}

#[actix_web::get("/ws/{name}")]
pub async fn route(
    p_name: web::Path<String>,
    req: HttpRequest,
    stream: web::Payload,
) -> HttpResponse {
    let conn = WsConn {
        nickname: p_name.to_string(),
        id: uuid::Uuid::new_v4().to_string(),
    };
    let resp = actix_web_actors::ws::start(conn, &req, stream);
    match resp {
        Ok(ret) => ret,
        Err(e) => e.into(),
    }
}

