import React, { Fragment, Component } from 'react';
import axios from 'axios';

import { CadastroEmpresasTable, CadastroEmpresasForm } from '.';

class CadastroEmpresas extends Component {
  state = {
    empresas: [],
  }

  componentDidMount() {

  }

  adicionarEmpresaHandle = ({ nome, cnpj, numero }) => {
    const empresas = [...this.state.empresas];

    if (empresas.findIndex(el => el.cnpj === cnpj) === -1) {
      empresas.push({
        nome,
        cnpj,
        numero,
        key: cnpj,
      });
    }
    this.setState({ empresas });
  }

  deletarEmpresaHandle = (key) => {
    const empresas = [...this.state.empresas];
    this.setState({ empresas: empresas.filter(item => item.key !== key) });
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
