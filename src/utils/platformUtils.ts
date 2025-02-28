import { platform } from '@tauri-apps/plugin-os';

const currentPlatform = platform();

export const getKspExecutablePath = (basePath: string): string => {
  const paths: Record<string, string> = {
    windows: `${basePath}\\KSP_x64.exe`,
    macos: `${basePath}/KSP.app`,
    linux: `${basePath}/KSP.x86_64`,
  };
  return paths[currentPlatform] || paths.windows;
};

export const getKspExecutableError = (): string => {
  const errors: Record<string, string> = {
    windows: 'KSP_x64.exe not found in the selected directory',
    macos: 'KSP.app not found in the selected directory',
    linux: 'KSP.x86_64 not found in the selected directory',
  };
  return errors[currentPlatform] || errors.windows;
};

export { currentPlatform };
