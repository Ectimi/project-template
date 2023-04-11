import { message } from 'antd';
import { setStorage, getStorage, removeStorage } from '@/utils/storage';

export interface IState {
 
}



const state: IState = {
};

export default {
  namespace: 'bookmark',
  state,
  reducers: {
    save(state: IState, { payload, callback }: any) {
      callback && callback(payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
   
  },
};
