mod resp_msg;
mod routes;
mod type_def;
mod utils;

use actix_web::{web, App, HttpServer};

use routes::get_res::{get_res_js, get_res_less};
use routes::page::chat_home;

use routes::ws;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    const SERVER_ADDR: &str = "127.0.0.1:9089";
    HttpServer::new(|| {
        App::new()
            .route("/ws/", web::get().to(ws::index))
            .service(chat_home)
            .service(get_res_js)
            .service(get_res_less)
    })
    .bind(SERVER_ADDR)?
    .run()
    .await
}
