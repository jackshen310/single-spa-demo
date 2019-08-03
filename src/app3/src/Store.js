// 消息总线
class Store {
  menus = [
    {
      name: 'app-3',
      path: '/app3',
      children: [
        {
          name: 'pageA',
          path: '/app3/pageA',
        },
        {
          name: 'pageB',
          path: '/app3/pageB',
        },
      ],
    },
  ];
  appName = 'app-3';
  appPath = '/app3';
  getAppMenuInfo = () => {
    let promise = new Promise(resolve => {
      resolve(this.menus);
    });
    return promise;
  };
}

export default Store;
