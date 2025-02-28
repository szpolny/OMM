use std::path::Path;

#[tauri::command]
#[specta::specta]
pub fn log_message(message: String) {
    println!("{}", message);
}

#[tauri::command]
#[specta::specta]
pub fn exists(path: String) -> bool {
    let file = Path::new(&path).exists();
    file
}
