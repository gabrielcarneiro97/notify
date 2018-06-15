import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';

import { api } from '../services';

class RemoverSms extends Component {
  static propTypes = {
    dados: PropTypes.shape({
      smsId: PropTypes.string,
      tituloId: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    disabled: false,
  }

  excluirSms = () => {
    const { smsId, tituloId } = this.props.dados;
    this.setState({ disabled: true }, () => {
      axios
        .delete(`${api}/sms/${smsId}`)
        .then(() => {
          this.props.onDelete(tituloId);
          this.setState({ disabled: false });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ disabled: false });
        });
    });
  }

  render() {
    return (
      <Popconfirm
        title="Deseja mesmo excluir essa mensagem?"
        okText="Sim"
        cancelText="Não"
        onConfirm={() => this.excluirSms()}
      >
        <Button icon="delete" {...this.state} />
      </Popconfirm>
    );
  }
}

export default RemoverSms;
