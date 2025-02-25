use std::sync::Mutex;
use steamworks::{Client, SingleClient};
use tauri::State;

pub struct SteamState {
    pub client: Mutex<Option<SingleClient>>,
}

pub fn initialize_steam(state: State<SteamState>) {
    let (_client, single) = Client::init().unwrap();
    *state.client.lock().unwrap() = Some(single);
    println!("Steam initialized!");
}
