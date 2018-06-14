import React, { Component } from 'react';
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
      <Row
        type="flex"
        justify="center"
        gutter={8}
      >
        <Col>
          <Input
            addonBefore="Número"
            value={this.state.numero}
            onChange={this.numeroHandleChange}
          />
        </Col>
        <Col>
          <Input
            addonBefore="Nome"
            value={this.state.nome}
            onChange={this.nomeHandleChange}
          />
        </Col>
        <Col>
          <Input
            addonBefore="CNPJ"
            value={this.state.cnpj}
            onChange={this.cnpjHandleChange}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={this.adicionarHandleClick}
            disabled={this.props.disabled || !this.checkCampos()}
          >
            Adicionar
          </Button>
        </Col>
      </Row>
    );
  }
}

export default CadastroEmpresasForm;
