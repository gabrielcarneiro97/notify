import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, message } from 'antd';

import { api } from '../services';

class EnviarTitulos extends Component {
  static propTypes = {
    selecionados: PropTypes.arrayOf(PropTypes.string).isRequired,
    titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  state = {
    isDisabled: false,
  }

  enviar = () => {
    const paraEnviar =
      this.props.titulos.filter(titulo => this.props.selecionados.includes(titulo.id));

    this.setState({ isDisabled: true }, () => {
      let counter = 0;
      let parte = [];
      const promises = [];
      for (let i = 0; i < paraEnviar.length; i += 1) {
        parte.push(paraEnviar[i]);
        if (counter === 20 || i === paraEnviar.length - 1) {
          counter = 0;
          promises.push(axios.post(`${api}/titulos`, parte));
          parte = [];
        } else {
          counter += 1;
        }
      }

      Promise.all(promises).then(() => {
        message.success('Remessas importadas com sucesso!');
        this.props.history.push('app/visualizar');
      }).catch(() => {
        message.error('Falha na importação das remessas!');
        this.setState({ isDisabled: false });
      });
    });
  };

  render() {
    const { selecionados } = this.props;
    return (
      <Button
        onClick={this.enviar}
        disabled={selecionados.length === 0 || this.state.isDisabled}
        type="primary"
      >
        Enviar
      </Button>
    );
  }
}

export default withRouter(EnviarTitulos);
