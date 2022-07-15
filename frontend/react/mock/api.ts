import mockjs from 'mockjs';
import { TBookmarkData } from '@/types/bookmark';
const Random = mockjs.Random;

export default {
  'GET /labels': (req: any, res: any) => {
    res.send({
      code: 0,
      status: 'success',
      ...mockjs.mock({
        'data|5-10': [{ 'id|+1': 1, label: '@cword(2,7)' }],
      }),
    });
  },

  'Get /bookmarks': (req: any, res: any) => {
    const data: TBookmarkData = [
      {
        id: new Date().getTime(),
        name: '掘金',
        icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/534995dd434a6e0e39a4521a5fe04f8e.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
        description: '技术社区',
        url: 'https://juejin.cn/',
        label: '前端',
      },
      {
        id: new Date().getTime(),
        name: 'Rect文档',
        icon: 'https://infinitypro-img.infinitynewtab.com/custom-icon/8001ertb6q4cdtmf9ytm6ca3mwjcoz.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
        description: 'React 官方文档',
        url: 'https://reactjs.org/',
        label: '前端',
      },
      {
        id: new Date().getTime(),
        name: 'Ant Design',
        icon: 'https://infinitypro-img.infinitynewtab.com/custom-icon/icon-1g4ic8vqoj2sqsxv9fe1zwt2zuv.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
        description: 'react 组件库',
        url: 'https://ant.design/index-cn',
        label: 'react',
      },
      {
        id: new Date().getTime(),
        name: 'ahooks',
        icon: 'https://infinitypro-img.infinitynewtab.com/custom-icon/icon-1g6555kcqu8mxo6n6899433zji9.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
        description: 'React Hooks 库',
        url: 'https://ahooks.js.org/zh-CN',
        label: 'react',
      },
    ];
  },
};
