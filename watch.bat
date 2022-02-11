@echo off
cargo watch -x "run --bin actix_chat_web" --ignore "html/*" --ignore "js/*" --ignore "css/*" --ignore "ts/*"