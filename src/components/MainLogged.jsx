import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { MainMenu, InserirDados, VisualizarTitulos } from '.';

const { Content, Sider } = Layout;

function MainLogged({ match }) {
  return (
    <Layout>
      <Sider width={230}>
        <MainMenu />
      </Sider>
      <Layout>
        <Content
          style={{
              background: '#ff100',
              padding: 24,
              margin: 0,
              minHeight: window.innerHeight - 64,
            }}
        >
          <Switch>
            <Route exact path={`${match.path}/registrar`} component={InserirDados} />
            <Route exact path={`${match.path}/visualizar`} component={VisualizarTitulos} />

            <Redirect from="/app" to={`${match.url}/visualizar`} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

MainLogged.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default MainLogged;
