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
          <Icon type="scan" />Visualizar Títulos
        </Link>
      </Menu.Item>
      <Menu.Item key={`${match.url}/clientes`}>
        <Link to={`${match.url}/clientes`}>
          <Icon type="team" />Cadastro Clientes
        </Link>
      </Menu.Item>
      <Menu.Item key={`${match.url}/mensagens`}>
        <Link to={`${match.url}/mensagens`}>
          <Icon type="message" />Gerenciar Mensagens
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
