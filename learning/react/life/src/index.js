import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppHeader from './components/header';
import List from './containers/List/';
import Detail from './containers/Detail/';

import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minWidth: 1200 }}>
          <Header className='header'>
            <AppHeader></AppHeader>
          </Header>
          <Content className='content'>
            <Switch>
              <Route path='/detail/:id' component={Detail} />
              <Route path='/:id' component={List} />
            </Switch>
          </Content>
          <Footer className='footer'>Footer</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
