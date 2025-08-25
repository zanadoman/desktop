export { }

declare global {
  interface Window {
    electronAPI: {
      log: (message: string) => void;
    };
  }
}
