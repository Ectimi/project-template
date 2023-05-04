const { contextBridge } = require('electron');

type getVersion = () => string;
export interface IVersions {
  node: getVersion;
  chrome: getVersion;
  electron: getVersion;
}

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});
