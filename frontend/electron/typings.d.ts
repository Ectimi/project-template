declare module '*.png';
declare module '*.jpg';
import { IVersions } from './main/preload';

declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare global {
  interface Window {
    readonly versions: IVersions;
  }
}
