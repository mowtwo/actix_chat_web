use super::type_def::OpenFileResult;
use actix_web::http::header::{ContentDisposition, DispositionType};

fn file_with_env(path: &str) -> String {
    const CARGO_MANIFEST_DIR: &str = env!("CARGO_MANIFEST_DIR");
    format!("{}/{}", CARGO_MANIFEST_DIR, path)
}

pub fn open_res_file(path: &str) -> OpenFileResult {
    let file = actix_files::NamedFile::open(file_with_env(path))?;
    Ok(file.set_content_disposition(ContentDisposition {
        disposition: DispositionType::Inline,
        parameters: vec![],
    }))
}
