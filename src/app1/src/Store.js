// 消息总线
class Store {
  menus = [
    {
      name: 'app-1',
      path: '/app1',
      children: [
        {
          name: 'pageA',
          path: '/app1/pageA',
        },
        {
          name: 'pageB',
          path: '/app1/pageB',
        },
      ],
    },
  ];
  appName = 'app-1';
  appPath = '/app1';
  getAppMenuInfo = () => {
    let promise = new Promise(resolve => {
      resolve(this.menus);
    });
    return promise;
  };
}

export default Store;
