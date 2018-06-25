import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';


import { api } from '../services';
import { GerenciarMensagensTable, GerenciarMensagensCheckbox } from '.';

class GerenciarMensagens extends Component {
  state = {
    titulos: [],
    getTitulos: false,
    smsAgendados: [],
    getSms: false,
    clientes: [],
    getClientes: false,
    isLoading: true,
    apenasNaoAgendados: false,
  };

  componentDidMount() {
    axios
      .get(`${api}/titulos/aberto`)
      .then(res => this.setState({ titulos: res.data, getTitulos: true }, () => this.isLoading()))
      .catch(err => console.error(err));

    axios
      .get(`${api}/sms/agendados`)
      .then(res => this.setState({ smsAgendados: res.data, getSms: true }, () => this.isLoading()))
      .catch(err => console.error(err));

    axios
      .get(`${api}/clientes`)
      .then(res => this.setState({ clientes: res.data, getClientes: true }, () => this.isLoading()))
      .catch(err => console.error(err));
  }

  smsDeleteHandle = (tituloId) => {
    const titulos = [...this.state.titulos];
    let smsAgendados = [...this.state.smsAgendados];

    smsAgendados = smsAgendados.filter(sms => sms.tituloId !== tituloId);

    const titulo = titulos.find(t => t.id === tituloId);

    delete titulo.smsId;

    this.setState({ titulos, smsAgendados });
  }

  smsAddHandle = (tituloId, { smsId, sms }) => {
    const titulos = [...this.state.titulos];
    const smsAgendados = [...this.state.smsAgendados];

    smsAgendados.push(sms);

    const titulo = titulos.find(t => t.id === tituloId);

    titulo.smsId = smsId;

    this.setState({ titulos, smsAgendados });
  }

  isLoading = () => {
    const { getClientes, getSms, getTitulos } = this.state;

    this.setState({ isLoading: !getClientes || !getSms || !getTitulos });
  }

  checkboxHandle = (checkboxValue) => {
    this.setState({ apenasNaoAgendados: checkboxValue });
  }

  render() {
    return (
      <Fragment>
        <Row
          justify="center"
          type="flex"
          style={{
            marginTop: '15px',
          }}
        >
          <Col span={23}>
            <GerenciarMensagensCheckbox
              onChange={this.checkboxHandle}
            />
          </Col>
        </Row>
        <GerenciarMensagensTable
          {...this.state}
          smsDelete={this.smsDeleteHandle}
          smsAdd={this.smsAddHandle}
        />
      </Fragment>
    );
  }
}

export default GerenciarMensagens;
