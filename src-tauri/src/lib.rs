use std::sync::Mutex;

mod steam;

pub fn run() {
    let app = tauri::Builder::default()
        .manage(steam::SteamState {
            client: Mutex::new(None),
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    // let steam_state = app.state::<steam::SteamState>();

    // steam::initialize_steam(steam_state);

    app.run(|_app, _event| {});
}
