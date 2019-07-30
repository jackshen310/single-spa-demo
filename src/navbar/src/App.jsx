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
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">
                <Link to="/app1">app 1</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/app2">app 2</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/app3">app 3</Link>
              </Menu.Item>
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
                      app1 1
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link to="/app1/pageA">page A</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/app1/pageB">page B</Link>
                  </Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                    </span>
                  }
                >
                  <Menu.Item key="5">
                    <Link to="/app3/pageA">page A</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/app3/pageB">page B</Link>
                  </Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
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
