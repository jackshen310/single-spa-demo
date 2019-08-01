import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
require('./index.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.globalMsgCenter = props.globalMsgCenter;
    this.state = {
      appStores: window.stores,
      currAppStore: window.stores[0],
      menus: [],
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidMount() {
    this.loadAppMenus(this.state.currAppStore);
  }

  loadAppMenus = store => {
    if (store) {
      store.getAppMenuInfo().then(menus => {
        this.setState({ menus, currAppStore: store });
        console.log(menus);
      });
    }
  };
  render() {
    const { menus, currAppStore, appStores } = this.state;
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              {appStores.map(store => {
                return (
                  <Menu.Item key={store.appPath}>
                    <Link to={store.appPath} onClick={this.loadAppMenus.bind(this, store)}>
                      {store.appName}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      {currAppStore.appName}
                    </span>
                  }
                >
                  {menus.map(item => {
                    return (
                      <Menu.Item key={item.path}>
                        <Link to={item.path}>{item.name}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              />
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
