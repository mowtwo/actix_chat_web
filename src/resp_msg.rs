use serde::Serialize;

#[derive(Serialize)]
pub struct RespMsg {
    pub msg: String,
}

#[derive(Serialize)]
pub struct RespWithData<T> {
    pub msg: RespMsg,
    pub data: T,
}

#[allow(dead_code)]
pub type JSONResult<T> = std::io::Result<actix_web::web::Json<T>>;

#[allow(dead_code)]
impl RespMsg {
    pub fn send_json(msg: &str) -> JSONResult<RespMsg> {
        Ok(actix_web::web::Json(RespMsg {
            msg: String::from(msg),
        }))
    }

    pub fn send_with_data<T>(msg: &str, data: T) -> JSONResult<RespWithData<T>> {
        Ok(actix_web::web::Json(RespWithData {
            msg: RespMsg {
                msg: String::from(msg),
            },
            data,
        }))
    }

    pub fn send_data_without_msg<T>(data: T) -> JSONResult<RespWithData<T>> {
        Ok(actix_web::web::Json(RespWithData {
            msg: RespMsg {
                msg: String::from(""),
            },
            data,
        }))
    }
}
