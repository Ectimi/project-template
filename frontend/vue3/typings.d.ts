declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component:DefineComponent<{},{},any>
  export default component;
}