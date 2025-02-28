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

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn test_exists_with_existing_file() {
        let temp_dir = tempdir().expect("Failed to create temp directory");
        let file_path = temp_dir.path().join("test_file.txt");

        let mut file = File::create(&file_path).expect("Failed to create test file");
        file.write_all(b"test content")
            .expect("Failed to write to test file");

        assert!(exists(file_path.to_string_lossy().to_string()));
    }

    #[test]
    fn test_exists_with_nonexistent_file() {
        assert!(!exists("/this/path/should/not/exist/file.txt".to_string()));
    }

    #[test]
    fn test_log_message_doesnt_panic() {
        log_message("Test message".to_string());
    }
}
