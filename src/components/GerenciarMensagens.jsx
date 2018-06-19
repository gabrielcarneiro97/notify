import React, { Component } from 'react';
import axios from 'axios';


import { api } from '../services';
import { GerenciarMensagensTable } from '.';

class GerenciarMensagens extends Component {
  state = {
    titulos: [],
    getTitulos: false,
    smsAgendados: [],
    getSms: false,
    clientes: [],
    getClientes: false,
    isLoading: true,
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

    const titulo = titulos.find(t => t.id === tituloId);

    delete titulo.smsId;

    this.setState({ titulos });
  }

  smsAddHandle = (tituloId, smsId) => {
    const titulos = [...this.state.titulos];

    const titulo = titulos.find(t => t.id === tituloId);

    titulo.smsId = smsId;

    this.setState({ titulos });
  }

  isLoading = () => {
    const { getClientes, getSms, getTitulos } = this.state;

    this.setState({ isLoading: !getClientes || !getSms || !getTitulos });
  }

  render() {
    return (
      <GerenciarMensagensTable
        {...this.state}
        smsDelete={this.smsDeleteHandle}
        smsAdd={this.smsAddHandle}
      />
    );
  }
}

export default GerenciarMensagens;
