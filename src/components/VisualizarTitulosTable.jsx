import React from 'react';
import moment from 'moment';
import { Table, Checkbox, Row, Col, Button, Popconfirm } from 'antd';

const columns = [{
  title: 'Número',
  dataIndex: 'numero',
  key: 'numero',
}, {
  title: 'Pagador',
  dataIndex: 'pagador',
  key: 'pagador',
}, {
  title: 'Vencimento',
  dataIndex: 'vencimento',
  key: 'vencimento',
}, {
  title: 'Valor Líquido',
  dataIndex: 'valorLiquido',
  key: 'valorLiquido',
}, {
  title: 'Pago',
  dataIndex: 'pago',
  key: 'pago',
  align: 'center',
}, {
  title: 'Excluir',
  dataIndex: 'excluir',
  key: 'excluir',
  align: 'center',
}];

function VisualizarTitulosTable(props) {
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

export default VisualizarTitulosTable;
