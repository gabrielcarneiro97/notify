import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table, Row, Col } from 'antd';

import { RemoverSms, AdicionarSms, PaginaCarregando } from '.';

class GerenciarMensagensTable extends Component {
  static propTypes = {
    clientes: PropTypes.arrayOf(PropTypes.object).isRequired,
    smsAgendados: PropTypes.arrayOf(PropTypes.object).isRequired,
    titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
    apenasNaoAgendados: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    smsDelete: PropTypes.func.isRequired,
    smsAdd: PropTypes.func.isRequired,
  }

  temCliente = id => this.props.clientes.findIndex(cliente => cliente.id === id) !== -1;

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
    const { titulos, apenasNaoAgendados } = this.props;
    const dataSource = [];
    titulos.forEach((titulo) => {
      if (this.temCliente(titulo.pagador.id) &&
        ((titulo.smsId && this.pegarSmsTituloId(titulo.id)) || (!titulo.smsId)) &&
        ((apenasNaoAgendados && !titulo.smsId) || (!apenasNaoAgendados))) {
        dataSource.push({
          key: titulo.numeroDocumento,
          numero: titulo.numeroDocumento,
          pagador: titulo.pagador.nome,
          vencimento: moment(titulo.vencimento.data).utc(false).format('DD/MM/YYYY'),
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
        <Row
          justify="center"
          type="flex"
          style={{
            marginTop: '15px',
          }}
        >
          <Col span={23}>
            <Table
              columns={columns}
              dataSource={dataSource}
            />
          </Col>
        </Row>
      );
    }

    return (
      <PaginaCarregando />
    );
  }
}

export default GerenciarMensagensTable;
