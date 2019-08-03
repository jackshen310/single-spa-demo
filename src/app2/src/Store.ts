// 消息总线
class Store {
  menus = [
    {
      name: 'app-2',
      path: '/app2',
      children: [
        {
          name: 'pageA',
          path: '/app2/pageA',
        },
        {
          name: 'pageB',
          path: '/app2/pageB',
        },
      ],
    },
  ];
  appName = 'app-2';
  appPath = '/app2';
  getAppMenuInfo = () => {
    let promise = new Promise(resolve => {
      resolve(this.menus);
    });
    return promise;
  };
}

export default Store;
