import React, { Fragment, Component } from 'react';
import axios from 'axios';

import { CadastroClientesTable, CadastroClientesForm, PaginaCarregando } from '.';
import { api } from '../services';

class CadastroClientes extends Component {
  state = {
    clientes: [],
    isLoading: true,
  }

  componentDidMount() {
    const clientes = [];

    axios
      .get(`${api}/clientes`)
      .then((res) => {
        res.data.forEach(el => clientes.push({ ...el, key: el.id }));
        this.setState({ clientes, isLoading: false });
      })
      .catch(err => console.error(err));
  }

  adicionarClienteHandle = (cliente) => {
    const clientes = [...this.state.clientes];

    const id = clientes.findIndex(el => el.id === cliente.id);

    if (id === -1) {
      clientes.push({
        ...cliente,
        key: cliente.id,
      });
    } else {
      clientes[id] = {
        ...cliente,
        key: cliente.id,
      };
    }

    axios
      .put(`${api}/clientes/${cliente.numero}`, { cliente })
      .then(() => this.setState({ clientes }))
      .catch(err => console.error(err));
  }

  deletarClienteHandle = (key) => {
    const clientes = [...this.state.clientes];

    const cliente = clientes.find(item => item.key === key);

    axios
      .delete(`${api}/clientes/${cliente.numero}`)
      .then(() => this.setState({ clientes: clientes.filter(item => item.key !== key) }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <Fragment>
          <CadastroClientesForm
            onClick={this.adicionarClienteHandle}
          />
          <CadastroClientesTable
            dataSource={this.state.clientes}
            onDelete={this.deletarClienteHandle}
          />
        </Fragment>
      );
    }

    return <PaginaCarregando />;
  }
}

export default CadastroClientes;
