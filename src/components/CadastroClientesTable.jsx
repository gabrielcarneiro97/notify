import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Popconfirm, Row, Col, Button } from 'antd';

class CadastroClientesTable extends Component {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Número',
      dataIndex: 'numero',
      width: '10%',
    }, {
      title: 'Nome',
      dataIndex: 'nome',
      width: '40%',
    }, {
      title: 'CNPJ/CPF',
      dataIndex: 'id',
      width: '20%',
    }, {
      title: 'Telefone',
      dataIndex: 'telefone',
      width: '20%',
    }, {
      title: 'Deletar',
      dataIndex: 'deletar',
      width: '10%',
      render: (text, record) => (
        <Popconfirm
          title="Deseja continuar?"
          okText="Sim"
          cancelText="Não"
          onConfirm={() => this.onDelete(record.key)}
        >
          <Button type="ghost" icon="delete" />
        </Popconfirm>
      ),
    }];
  }

  onDelete = (key) => {
    this.props.onDelete(key);
  }

  render() {
    const { columns } = this;
    return (
      <Row
        justify="center"
        type="flex"
        style={{
          marginTop: '15px',
        }}
      >
        <Col span={23}>
          <Table dataSource={this.props.dataSource} columns={columns} />
        </Col>
      </Row>
    );
  }
}

export default CadastroClientesTable;
