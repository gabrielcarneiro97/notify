import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Row, Col, Checkbox } from 'antd';

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
}];

function TitulosTable(props) {
  const { titulos, selecionados } = props;
  const dataSource = [];

  const rowSelection = {
    onChange: (selecionadosKeys) => {
      props.onSelecionadosChange(selecionadosKeys);
    },
    selectedRowKeys: selecionados,
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
      emissao: moment(titulo.emissao.data).utc(false).format('DD/MM/YYYY'),
      vencimento: moment(titulo.vencimento.data).utc(false).format('DD/MM/YYYY'),
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
          rowSelection={rowSelection}
        />
      </Col>
    </Row>
  );
}

TitulosTable.propTypes = {
  onSelecionadosChange: PropTypes.func.isRequired,
  onTituloChange: PropTypes.func.isRequired, // eslint-disable-line
  titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selecionados: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TitulosTable;
