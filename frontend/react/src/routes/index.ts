import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';

const routes: IConfigFromPlugins['routes'] = [
  { path: '/', component: '@/pages/Home/index' },
];

export { routes };
