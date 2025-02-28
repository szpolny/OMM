mod models;
#[cfg(target_os = "windows")]
mod platform;

use keyvalues_serde::from_str;
use models::LibraryFolders;
use std::path::PathBuf;

const KSP_APP_ID: &str = "220200";
const KSP_GAME_PATH: &str = "\\steamapps\\common\\Kerbal Space Program";

#[tauri::command]
#[specta::specta]
pub fn determine_steam_game_location() -> Option<String> {
    #[cfg(target_os = "windows")]
    {
        // Get Steam installation path
        let steam_install_path = match platform::windows::read_from_registry() {
            Ok(path) => path,
            Err(err) => {
                println!("Failed to read Steam install path from registry: {}", err);
                return None;
            }
        };

        // Build path to libraryfolders.vdf
        let library_folders_path = PathBuf::from(&steam_install_path)
            .join("steamapps")
            .join("libraryfolders.vdf");

        // Read and parse libraryfolders.vdf
        let library_folders_content = match std::fs::read_to_string(&library_folders_path) {
            Ok(content) => content,
            Err(err) => {
                println!("Failed to read libraryfolders.vdf file: {}", err);
                return None;
            }
        };

        let library_folders = match from_str::<LibraryFolders>(&library_folders_content) {
            Ok(parsed) => parsed,
            Err(err) => {
                println!("Failed to parse libraryfolders.vdf file: {}", err);
                return None;
            }
        };

        // Search for KSP in library folders
        for (_key, value) in library_folders.0.entries.into_iter() {
            if let Some(apps) = value.apps {
                if apps.contains_key(KSP_APP_ID) {
                    return Some(value.path + KSP_GAME_PATH);
                }
            }
        }

        None
    }

    // TODO: Implement for other platforms
    #[cfg(not(target_os = "windows"))]
    {
        None
    }
}
