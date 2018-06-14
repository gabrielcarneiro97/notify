import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Checkbox, Row, Col, Button, Popconfirm } from 'antd';

function VisualizarTitulosTable(props) {
  const render = (texto, titulo) => {
    const spanProps = {};

    if (!titulo.pagoBool && moment(titulo.vencimento, 'DD/MM/YYYY').unix() < moment().unix()) {
      spanProps.style = {
        color: 'red',
      };
    }


    return <span {...spanProps}>{texto}</span>;
  };

  const columns = [{
    title: 'Número',
    dataIndex: 'numero',
    key: 'numero',
    render,
  }, {
    title: 'Pagador',
    dataIndex: 'pagador',
    key: 'pagador',
    render,
  }, {
    title: 'Vencimento',
    dataIndex: 'vencimento',
    key: 'vencimento',
    render,
  }, {
    title: 'Valor Líquido',
    dataIndex: 'valorLiquido',
    key: 'valorLiquido',
    render,
  }, {
    title: 'Pago',
    dataIndex: 'pago',
    key: 'pago',
    align: 'center',
    render,
  }, {
    title: 'Excluir',
    dataIndex: 'excluir',
    key: 'excluir',
    align: 'center',
  }];

  const { titulos } = props;
  const dataSource = [];

  const excluirTitulo = (id) => {
    props.onTituloDelete(id);
  };

  titulos.forEach((titulo) => {
    dataSource.push({
      numero: titulo.numeroDocumento,
      key: titulo.id,
      valorLiquido: titulo.valorLiquido.toLocaleString('pt-BR'),
      pago: (
        <Checkbox
          checked={titulo.pago}
          onChange={() => {
            props.onTituloChange(titulo.id);
          }}
        />
      ),
      pagoBool: titulo.pago,
      pagador: titulo.pagador.nome,
      emissao: moment(titulo.emissao.data).format('DD[/]MM[/]YYYY'),
      vencimento: moment(titulo.vencimento.data).format('DD[/]MM[/]YYYY'),
      excluir: (
        <Popconfirm
          title="Deseja mesmo excluir esse título?"
          okText="Sim"
          cancelText="Não"
          onConfirm={() => excluirTitulo(titulo.id)}
        >
          <Button type="ghost" icon="delete" />
        </Popconfirm>
      ),
    });
  });

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

VisualizarTitulosTable.propTypes = {
  onTituloDelete: PropTypes.func.isRequired,
  titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VisualizarTitulosTable;
