use keyvalues_serde::from_str;
use serde::Deserialize;
use std::collections::HashMap;

#[cfg(target_os = "windows")]
use windows::{
    core::HSTRING,
    Win32::System::Registry::{RegGetValueW, HKEY_LOCAL_MACHINE, RRF_RT_REG_SZ},
};

#[derive(Debug, Clone, Deserialize)]
#[serde(rename = "libraryfolders")]
struct LibraryFolders(Inner);

#[derive(Debug, Clone, Deserialize)]
#[serde(rename = "inner")]
struct Inner {
    #[serde(flatten)]
    entries: HashMap<String, LibraryFoldersEntry>,
}

#[derive(Deserialize, Debug, Clone)]
#[allow(dead_code)]
struct LibraryFoldersEntry {
    path: String,
    label: String,
    contentid: Option<String>,
    totalsize: Option<String>,
    update_clean_bytes_tally: Option<String>,
    time_last_update_corruption: Option<String>,
    apps: Option<HashMap<String, String>>,
}

#[tauri::command]
#[specta::specta]
pub fn determine_steam_game_location() -> Option<String> {
    #[cfg(target_os = "windows")]
    {
        let steam_install_path = read_from_windows_registry();

        if steam_install_path.is_err() {
            println!(
                "Failed to read Steam install path from registry: {}",
                steam_install_path.err().unwrap()
            );
            return None;
        }

        let steam_install_path = steam_install_path.unwrap();

        let library_folders = steam_install_path + "\\steamapps\\libraryfolders.vdf";

        let library_folders = std::fs::read_to_string(library_folders);

        if library_folders.is_err() {
            println!(
                "Failed to read libraryfolders.vdf file: {}",
                library_folders.err().unwrap()
            );
            return None;
        }

        let library_folders = library_folders.unwrap();

        let library_folders = from_str::<LibraryFolders>(&library_folders);

        if library_folders.is_err() {
            println!(
                "Failed to parse libraryfolders.vdf file: {}",
                library_folders.err().unwrap()
            );
            return None;
        }

        let library_folders = library_folders.unwrap();

        let gamelocation;

        for (_key, value) in library_folders.0.entries.into_iter() {
            if value.apps.is_none() {
                continue;
            }

            for (appid, _value) in value.apps.unwrap().into_iter() {
                if appid == "220200" {
                    gamelocation = value.path + "\\common\\Kerbal Space Program";
                    return Some(gamelocation);
                }
            }
        }

        return None;
    }

    // TODO: Implement for other platforms
    #[cfg(not(target_os = "windows"))]
    {
        None
    }
}

#[cfg(target_os = "windows")]
fn read_from_windows_registry() -> Result<String, String> {
    unsafe {
        // Define registry key and value name
        let subkey = HSTRING::from("SOFTWARE\\WOW6432Node\\Valve\\Steam");
        let value_name = HSTRING::from("InstallPath");

        // Buffer to store the registry value
        let mut buffer = [0u16; 260]; // MAX_PATH is typically 260
        let mut buffer_size = (buffer.len() * 2) as u32; // Size in bytes

        // Read the registry value
        let result = RegGetValueW(
            HKEY_LOCAL_MACHINE,
            &subkey,
            &value_name,
            RRF_RT_REG_SZ,
            None,
            Some(buffer.as_mut_ptr() as *mut _),
            Some(&mut buffer_size),
        );

        if result.is_ok() {
            // Convert buffer to string
            let len = buffer_size as usize / 2 - 1; // Remove null terminator
            let path = String::from_utf16_lossy(&buffer[..len]);
            Ok(path)
        } else {
            Err(format!(
                "Failed to read registry value. Error code: {:?}",
                result
            ))
        }
    }
}
