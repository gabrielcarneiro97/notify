import React, { Component } from 'react';
import axios from 'axios';

import { Button, Tooltip } from 'antd';

import { api } from '../services';

class AdicionarSms extends Component {
  state = {
    disabled: false,
  }

  handleClick = () => {
    this.setState({ disabled: true }, () => {
      const { titulo } = this.props.dados;

      axios
        .post(`${api}/sms`, { titulo })
        .then(res => this.setState({ disabled: false }, () => this.props.onAdd(titulo.id, res.data)))
        .catch((err) => {
          console.error(err);
          this.setState({ disabled: false });
        });
    });
  }

  render() {
    return (
      <Tooltip title="Adicionar SMS">
        <Button
          icon="file-add"
          onClick={this.handleClick}
          {...this.state}
        />
      </Tooltip>
    );
  }
}

export default AdicionarSms;
