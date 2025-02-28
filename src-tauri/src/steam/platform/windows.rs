use windows::{
    core::HSTRING,
    Win32::System::Registry::{RegGetValueW, HKEY_LOCAL_MACHINE, RRF_RT_REG_SZ},
};

pub fn read_from_registry() -> Result<String, String> {
    unsafe {
        let subkey = HSTRING::from("SOFTWARE\\WOW6432Node\\Valve\\Steam");
        let value_name = HSTRING::from("InstallPath");

        let mut buffer = [0u16; 260];
        let mut buffer_size = (buffer.len() * 2) as u32;

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
            let len = buffer_size as usize / 2 - 1;
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
