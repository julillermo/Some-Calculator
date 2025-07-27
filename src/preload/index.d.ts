import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    versions: {
      node: () => string
      chrome: () => string
      electron: () => string
    }
    api: unknown
  }
}
