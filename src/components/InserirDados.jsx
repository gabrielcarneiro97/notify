import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import { ImportarArquivos, EnviarTitulosTable, EnviarTitulos } from '.';


class InserirDados extends Component {
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
      <Fragment>
        <Row
          type="flex"
          justify="center"
        >
          <Col
            span={11}
          >
            <ImportarArquivos
              accept=".REM,.TXT"
              showUploadList={false}
              onNewFile={this.newFile}
            >
              Selecionar Remessa
            </ImportarArquivos>
          </Col>
          <Col
            span={11}
            style={{
              textAlign: 'end',
            }}
          >
            <EnviarTitulos {...this.state} />
          </Col>
        </Row>
        <Row>
          <EnviarTitulosTable
            titulos={this.state.titulos}
            selecionados={this.state.selecionados}
            onSelecionadosChange={this.selecionadosChangeHandle}
            onTituloChange={this.tituloChangeHandle}
          />
        </Row>
      </Fragment>

    );
  }
}

export default InserirDados;
