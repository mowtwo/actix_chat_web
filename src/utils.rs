use super::type_def::OpenFileResult;

fn file_with_env(path: &str) -> String {
    const CARGO_MANIFEST_DIR: &str = env!("CARGO_MANIFEST_DIR");
    format!("{}/{}", CARGO_MANIFEST_DIR, path)
}

pub fn open_res_file(path: &str) -> OpenFileResult {
    Ok(actix_files::NamedFile::open(file_with_env(path))?)
}
