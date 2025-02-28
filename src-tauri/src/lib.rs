use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

mod steam;
mod utils;

fn register_plugins(builder: tauri::Builder<tauri::Wry>) -> tauri::Builder<tauri::Wry> {
    builder
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
}

pub fn run() {
    // Setup Specta for TypeScript bindings
    let specta_builder = Builder::<tauri::Wry>::new().commands(collect_commands![
        steam::determine_steam_game_location,
        utils::log_message,
        utils::exists
    ]);

    // Generate TypeScript bindings in debug mode
    #[cfg(debug_assertions)]
    specta_builder
        .export(Typescript::default(), "../src/bindings.ts")
        .expect("Failed to export typescript bindings");

    // Build and run the Tauri application
    let app_builder = register_plugins(tauri::Builder::default())
        .setup(move |app| {
            specta_builder.mount_events(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            steam::determine_steam_game_location,
            utils::log_message,
            utils::exists
        ]);

    app_builder
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
