import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'antd';

class CadastroEmpresasForm extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  state = {
    numero: '',
    nome: '',
    cnpj: '',
    telefone: '',
  }

  numeroHandleChange = (e) => {
    this.setState({ numero: e.target.value });
  }

  nomeHandleChange = (e) => {
    this.setState({ nome: e.target.value });
  }

  cnpjHandleChange = (e) => {
    this.setState({ cnpj: e.target.value });
  }

  telefoneHandleChange = (e) => {
    this.setState({ telefone: e.target.value });
  }

  adicionarHandleClick = () => {
    this.setState({
      numero: '',
      nome: '',
      cnpj: '',
    });
    this.props.onClick(this.state);
  }

  checkCampos = () => {
    const { numero, nome, cnpj } = this.state;

    if (numero !== '' && nome !== '' && cnpj !== '') {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Fragment>
        <Row
          type="flex"
          justify="center"
          gutter={8}
        >
          <Col
            span={4}
          >
            <Input
              addonBefore="Número"
              value={this.state.numero}
              onChange={this.numeroHandleChange}
            />
          </Col>
          <Col
            span={19}
          >
            <Input
              addonBefore="Nome"
              value={this.state.nome}
              onChange={this.nomeHandleChange}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          gutter={8}
          style={{
            marginTop: '8px',
          }}
        >
          <Col
            span={10}
          >
            <Input
              addonBefore="CNPJ"
              value={this.state.cnpj}
              onChange={this.cnpjHandleChange}
            />
          </Col>
          <Col
            span={10}
          >
            <Input
              addonBefore="Telefone"
              value={this.state.telefone}
              onChange={this.telefoneHandleChange}
            />
          </Col>
          <Col
            span={3}
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              type="primary"
              onClick={this.adicionarHandleClick}
              disabled={this.props.disabled || !this.checkCampos()}
            >
              Adicionar
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default CadastroEmpresasForm;
