import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { funcA } from './util';
export default class App extends Component {
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
    this.token && this.globalMsgCenter.unsubscribe(token);
  }
  fallback = () => {
    return <div>Loading...</div>;
  };
  componentDidCatch(e) {
    console.error(e);
  }
  // React.lazy和Suspense使用参考：https://juejin.im/post/5bd70def6fb9a05d38282c30
  render() {
    funcA();
    return (
      <div>
        this is {process.env.NODE_ENV} mode <br />
        <Router basename="/app1">
          <div>
            <Suspense fallback={this.fallback()}>
              {routes.map((route, i) => {
                return <RouteWithSubRoutes {...route} key={i} />;
              })}
              <Link to="/A">to A</Link>
              <br />
              <Link to="/C">to C</Link>
            </Suspense>
          </div>
        </Router>
      </div>
    );
  }
}
