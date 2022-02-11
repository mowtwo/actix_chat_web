use actix_web::HttpRequest;

use super::super::type_def::OpenFileResult;
use super::super::utils::open_res_file;

#[actix_web::get("/js/{filename:.+\\.js}")]
pub async fn get_res_js(req: HttpRequest) -> OpenFileResult {
    let path = req.match_info().query("filename");
    open_res_file(&format!("js/{}", path)[..])
}

#[actix_web::get("/css/{filename:.+\\.less}")]
pub async fn get_res_less(req: HttpRequest) -> OpenFileResult {
    let path = req.match_info().query("filename");
    open_res_file(&format!("css/{}", path)[..])
}
