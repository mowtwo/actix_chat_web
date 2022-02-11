mod resp_msg;
mod routes;
mod type_def;
mod utils;

use actix_web::{App, HttpServer};


use routes::get_res::{get_res_js, get_res_less};
use routes::page::chat_home;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    const SERVER_ADDR: &str = "127.0.0.1:9089";
    HttpServer::new(|| {
        App::new()
            .service(chat_home)
            .service(get_res_js)
            .service(get_res_less)
    })
    .bind(SERVER_ADDR)?
    .run()
    .await
}
