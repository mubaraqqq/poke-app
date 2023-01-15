import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'receive-pokemon' | 'open-pokemon';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    receivePoke: (func: (...args: string[]) => void) =>
      ipcRenderer.on('receive-pokemon', (event, ...args: string[]) =>
        func(...args)
      ),
    invoke: () => ipcRenderer.invoke('my-invokable-ipc'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
