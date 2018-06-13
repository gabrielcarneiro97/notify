import * as React from 'react';
import propTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

function MainMenu(props) {
  const { match } = props;
  const { pathname } = props.location;

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key={`${match.url}/registrar`}>
        <Link to={`${match.url}/registrar`}>
          <Icon type="download" />Inserir Dados
        </Link>
      </Menu.Item>
      <Menu.Item key={`${match.url}/visualizar`}>
        <Link to={`${match.url}/visualizar`}>
          <Icon type="folder-open" />Visualizar Títulos
        </Link>
      </Menu.Item>
      <Menu.Item key={`${match.url}/empresas`}>
        <Link to={`${match.url}/empresas`}>
          <Icon type="safety" />Cadastro Empresas
        </Link>
      </Menu.Item>
    </Menu>
  );
}

MainMenu.propTypes = {
  match: propTypes.shape({
    url: propTypes.string,
  }).isRequired,
  location: propTypes.shape({
    pathname: propTypes.string,
  }).isRequired,
};

export default withRouter(MainMenu);
