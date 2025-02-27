use serde_json::json;
use specta_typescript::Typescript;
use tauri_plugin_store::StoreExt;
use tauri_specta::{collect_commands, Builder};

mod steam;

pub fn run() {
    let builder = Builder::<tauri::Wry>::new()
        .commands(collect_commands![steam::determine_steam_game_location]);

    #[cfg(debug_assertions)] // <- Only export on non-release builds
    builder
        .export(Typescript::default(), "../src/bindings.ts")
        .expect("Failed to export typescript bindings");

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(move |app| {
            builder.mount_events(app);

            let store = app.store("data.json")?;

            let initialized = store.get("initialized").and_then(|v| v.as_bool());

            if initialized == None {
                store.set("initialized", json!(false));
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            steam::determine_steam_game_location
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
