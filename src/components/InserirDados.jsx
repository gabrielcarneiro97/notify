import React from 'react';

import { ImportarArquivos, TitulosTable, EnviarTitulos } from '.';

class InserirDados extends React.Component {
  state = {
    titulos: [],
    selecionados: [],
  };

  newFile = (file) => {
    this.setState((prevState) => {
      const { selecionados } = prevState;
      let { titulos } = prevState;
      titulos = titulos.concat(file.titulos);

      file.titulos.forEach(el => selecionados.push(el.id));

      return { titulos, selecionados };
    });
  }

  tituloChangeHandle = (key) => {
    const { titulos } = this.state;

    const titulo = titulos.find(el => el.id === key);
    titulo.pago = !titulo.pago;

    this.setState({ titulos });
  }

  selecionadosChangeHandle = (selecionados) => {
    this.setState({ selecionados });
  }

  render() {
    return (
      <div>
        <ImportarArquivos
          accept=".REM"
          showUploadList={false}
          onNewFile={this.newFile}
        >
          Selecionar Remessa
        </ImportarArquivos>
        <EnviarTitulos {...this.state} />
        <div>
          <TitulosTable
            titulos={this.state.titulos}
            selecionados={this.state.selecionados}
            onSelecionadosChange={this.selecionadosChangeHandle}
            onTituloChange={this.tituloChangeHandle}
          />
        </div>
      </div>
    );
  }
}

export default InserirDados;
