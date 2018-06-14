import React, { Fragment, Component } from 'react';
import axios from 'axios';

import { CadastroEmpresasTable, CadastroEmpresasForm } from '.';
import { api } from '../services';

class CadastroEmpresas extends Component {
  state = {
    empresas: [],
  }

  componentDidMount() {
    const empresas = [];

    axios
      .get(`${api}/empresas`)
      .then((res) => {
        res.data.forEach(el => empresas.push({ ...el, key: el.cnpj }));
        this.setState({ empresas });
      })
      .catch(err => console.error(err));
  }

  adicionarEmpresaHandle = (empresa) => {
    const empresas = [...this.state.empresas];

    const id = empresas.findIndex(el => el.cnpj === empresa.cnpj);

    if (id === -1) {
      empresas.push({
        ...empresa,
        key: empresa.cnpj,
      });
    } else {
      empresas[id] = {
        ...empresa,
        key: empresa.cnpj,
      };
    }

    axios
      .put(`${api}/empresas/${empresa.numero}`, { empresa })
      .then(() => this.setState({ empresas }))
      .catch(err => console.error(err));
  }

  deletarEmpresaHandle = (key) => {
    const empresas = [...this.state.empresas];

    const empresa = empresas.find(item => item.key === key);

    axios
      .delete(`${api}/empresas/${empresa.numero}`)
      .then(() => this.setState({ empresas: empresas.filter(item => item.key !== key) }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Fragment>
        <CadastroEmpresasForm
          onClick={this.adicionarEmpresaHandle}
        />
        <CadastroEmpresasTable
          dataSource={this.state.empresas}
          onDelete={this.deletarEmpresaHandle}
        />
      </Fragment>
    );
  }
}

export default CadastroEmpresas;
