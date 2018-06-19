import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import moment from 'moment';

import 'moment/locale/pt-br';
import 'antd/dist/antd.css';

import { PrivateRoute, MainLogged, Login, Navbar, Page404 } from './components';

const { Header } = Layout;

moment.locale('pt-br');

function Main() {
  return <Redirect to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{ paddingLeft: '0', backgroundColor: '#096dd9' }}>
          <Navbar />
        </Header>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/app" component={MainLogged} />
          <Route component={Page404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
