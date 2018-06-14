import React, { Component } from 'react';
import moment from 'moment';

import { Table } from 'antd';

import { RemoverSms } from '.';

class GerenciarMensagensTable extends Component {
  static columns = [{
    title: 'Número',
    dataIndex: 'numero',
    width: '20%',
  }, {
    title: 'Pagador',
    dataIndex: 'pagador',
    width: '25%',
  }, {
    title: 'Vencimento',
    dataIndex: 'vencimento',
    width: '20%',
  }, {
    title: 'Status Mensagem',
    dataIndex: 'statusMensagem',
    width: '15%',
  }, {
    title: 'Ação',
    dataIndex: 'acao',
    width: '10%',
    render: (dados, row) => {
      if (dados.smsId) {
        return <RemoverSms dados={dados} />;
      }
    },
  }];

  state = {};

  componentDidMount() {

  }
  render() {
    const { titulos } = this.props;
    const dataSource = [];

    titulos.forEach((titulo) => {
      dataSource.push({
        key: titulo.numeroDocumento,
        numero: titulo.numeroDocumento,
        pagador: titulo.pagador.nome,
        vencimento: moment(titulo.vencimento.data).format('DD/MM/YYYY'),
        statusMensagem: titulo.idSms ? 'AGENDADA' : 'NÃO AGENDADA',
        acao: { smsId: titulo.idSms, tituloId: titulo.id },
      });
    });

    return (
      <Table
        columns={GerenciarMensagensTable.columns}
        dataSource={dataSource}
      />
    );
  }
}

export default GerenciarMensagensTable;
