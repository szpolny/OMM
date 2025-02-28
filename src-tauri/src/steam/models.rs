use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename = "libraryfolders")]
pub struct LibraryFolders(pub Inner);

#[derive(Debug, Clone, Deserialize)]
#[serde(rename = "inner")]
pub struct Inner {
    #[serde(flatten)]
    pub entries: HashMap<String, LibraryFoldersEntry>,
}

#[derive(Deserialize, Debug, Clone)]
#[allow(dead_code)]
pub struct LibraryFoldersEntry {
    pub path: String,
    pub label: String,
    pub contentid: Option<String>,
    pub totalsize: Option<String>,
    pub update_clean_bytes_tally: Option<String>,
    pub time_last_update_corruption: Option<String>,
    pub apps: Option<HashMap<String, String>>,
}
