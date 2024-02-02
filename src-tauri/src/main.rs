// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod settings;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            settings::settings_get,
            settings::settings_set
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
