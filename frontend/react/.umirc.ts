import { defineConfig } from 'umi';
import path from 'path';
import { routes } from './src/routes';

export default defineConfig({
  base: '/',
  publicPath: '/',
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  alias: {
    pages: path.resolve(__dirname, 'src/pages'),
    layouts: path.resolve(__dirname, 'src/layouts'),
    components: path.resolve(__dirname, 'src/components/'),
    routes: path.resolve(__dirname, 'src/routes/'),
    styles: path.resolve(__dirname, 'src/styles/'),
    server: path.resolve(__dirname, 'src/server/'),
    utils: path.resolve(__dirname, 'src/utils/'),
  },
  dva: {},
});
