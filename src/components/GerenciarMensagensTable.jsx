import React, { Component } from 'react';
import moment from 'moment';

import { Table } from 'antd';

import { RemoverSms, AdicionarSms, PaginaCarregando } from '.';

class GerenciarMensagensTable extends Component {
  temEmpresa = cnpj => this.props.empresas.findIndex(empresa => empresa.cnpj === cnpj) !== -1;

  pegarSmsTituloId = tituloId => this.props.smsAgendados.find(sms => sms.tituloId === tituloId);

  defineColumns = () => [{
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
    render: (dados) => {
      if (dados.smsId) {
        return (
          <RemoverSms
            dados={dados}
            onDelete={this.props.smsDelete}
          />
        );
      }
      return <AdicionarSms dados={dados} onAdd={this.props.smsAdd} />;
    },
  }];

  defineDataSource = () => {
    const { titulos } = this.props;
    const dataSource = [];
    titulos.forEach((titulo) => {
      if (this.temEmpresa(titulo.pagador.id) && this.pegarSmsTituloId(titulo.id)) {
        dataSource.push({
          key: titulo.numeroDocumento,
          numero: titulo.numeroDocumento,
          pagador: titulo.pagador.nome,
          vencimento: moment(titulo.vencimento.data).format('DD/MM/YYYY'),
          statusMensagem: titulo.smsId ? 'AGENDADA' : 'NÃO AGENDADA',
          acao: { smsId: titulo.smsId, tituloId: titulo.id, titulo },
        });
      }
    });
    return dataSource;
  }

  render() {
    if (!this.props.isLoading) {
      const columns = this.defineColumns();
      const dataSource = this.defineDataSource();

      return (
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      );
    }

    return (
      <PaginaCarregando />
    );
  }
}

export default GerenciarMensagensTable;
