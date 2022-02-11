use super::super::type_def::OpenFileResult;
use super::super::utils::open_res_file;

#[actix_web::get("/chat")]
pub async fn chat_home() -> OpenFileResult {
    open_res_file("html/index.html")
}
