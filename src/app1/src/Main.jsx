import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PagesRouter from './pages/PagesRouter';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Main extends Component {
  constructor(props) {
    super(props);
    // 使用从props中传递过来的globalMsgCenter消息总线，并使用该消息总线发布和订阅事件，以便和其它微服务沟通
    if (props.globalMsgCenter) {
      this.globalMsgCenter = props.globalMsgCenter;
      this.initEvent();
    }
  }
  initEvent() {
    this.token = this.globalMsgCenter.subscribe('navbar-click', (topic, data) => {
      console.log('navbar-click', data);
    });
  }
  componentWillUnmount() {
    // this.token && this.globalMsgCenter.unsubscribe(token);
  }

  componentDidCatch(e) {
    console.error(e);
  }
  // React.lazy和Suspense使用参考：https://juejin.im/post/5bd70def6fb9a05d38282c30
  render() {
    console.log('render Main...');
    return (
      <Router basename="/app1">
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">
                <Link to="/app1">app 1</Link>
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
                      subnav 1
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link to="/pageA">page A</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/pageB">page B</Link>
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
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
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
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <PagesRouter />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
