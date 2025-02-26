use serde_json::json;
use std::sync::Mutex;
use tauri_plugin_store::StoreExt;

mod steam;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let store = app.store("data.json")?;

            let initialized = store.get("initialized").and_then(|v| v.as_bool());

            if initialized == None {
                store.set("initialized", json!(true));
            }

            Ok(())
        })
        .manage(steam::SteamState {
            client: Mutex::new(None),
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
