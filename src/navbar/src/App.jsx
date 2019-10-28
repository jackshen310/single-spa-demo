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
  renderMenu = menus => {
    return menus.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type="user" />
                {item.name}
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        );
      }
    });
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
                {this.renderMenu(menus)}
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
              >
                <div id="app1_style" />
                <div id="app2_style" />
                <div id="app3_style" />
                <div id="app4_style" />
                <div id="app5_style" />
                <div id="app1" />
                <div id="app2" />
                <div id="app3" />
                <div id="app4" />
                <div id="app5" />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
