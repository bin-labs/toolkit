use lazy_static::lazy_static;
use std::collections::HashMap;
use std::fs;
use std::sync::Mutex;
use tauri::command;

lazy_static! {
    static ref STORE: Mutex<HashMap<String, String>> = {
        let file_path = get_file_path();
        let content = fs::read_to_string(file_path).unwrap_or("{}".to_string());
        let map: HashMap<String, String> = serde_json::from_str(content.as_str()).unwrap();
        Mutex::new(map)
    };
}

#[command]
pub fn settings_get(key: String) -> Option<String> {
    let guard = STORE.lock().unwrap();
    if let Some(v) = guard.get(&key) {
        return Some(v.to_string());
    }
    return None;
}

#[command]
pub fn settings_set(key: String, value: String) {
    STORE.lock().unwrap().insert(key, value);
    save_settings();
}

fn save_settings() {
    let guard = STORE.lock().unwrap();
    let json: String = serde_json::to_string(&*guard).unwrap();
    let file_path = get_file_path();
    std::fs::write(file_path, json).unwrap();
}

fn get_file_path() -> String {
    let home = home::home_dir().unwrap();
    let file_path = std::path::Path::new(&home)
        .join(".tookit")
        .join("settings.json");
    fs::create_dir_all(file_path.parent().unwrap()).unwrap();
    file_path.to_str().unwrap().to_string()
}
