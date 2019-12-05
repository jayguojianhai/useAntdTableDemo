/**
 * author     : jayguo
 * createTime : 2019-11-14 13:24
 */
const mock = [{
  id: 1,
  name: 'zhansan',
  status: '1',
}, {
  id: 2,
  name: 'zhansan2',
  status: '2',
}, {
  id: 3,
  name: 'zhansan3',
  status: '2',
}, {
  id: 4,
  name: 'zhansan4',
  status: '3',
}];
export default {
  namespace: 'referral',

  state: {
    list: [],
    total: 0,
  },
  effects: {
    * fetchList({ payload, callback }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          list: mock,
          total: mock.length,
        },
      });
      return {
        list: mock,
        total: mock.length,
      };
    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },

    subscriptions: {
      setup({ history }) {
        // Subscribe history(url) change, trigger `load` action if pathname is `/`
        return history.listen(({ pathname, search }) => {

        });
      },
    },
  },
};
