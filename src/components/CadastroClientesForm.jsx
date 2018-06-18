import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'antd';

class CadastroClientesForm extends Component {
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
    id: '',
    telefone: '',
  }

  numeroHandleChange = (e) => {
    this.setState({ numero: e.target.value });
  }

  nomeHandleChange = (e) => {
    this.setState({ nome: e.target.value });
  }

  idHandleChange = (e) => {
    this.setState({ id: e.target.value });
  }

  telefoneHandleChange = (e) => {
    this.setState({ telefone: e.target.value });
  }

  adicionarHandleClick = () => {
    this.setState({
      numero: '',
      nome: '',
      id: '',
      telefone: '',
    });
    this.props.onClick(this.state);
  }

  checkCampos = () => {
    const { numero, nome, id } = this.state;

    if (numero !== '' && nome !== '' && id !== '') {
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
              addonBefore="CNPJ/CPF"
              value={this.state.id}
              onChange={this.idHandleChange}
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

export default CadastroClientesForm;
