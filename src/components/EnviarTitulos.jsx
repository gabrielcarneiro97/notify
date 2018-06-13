import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, message } from 'antd';

import { api } from '../services';

function EnviarTitulos(props) {
  const { selecionados, titulos } = props;

  const enviar = () => {
    const paraEnviar = titulos.filter(titulo => selecionados.includes(titulo.id));
    axios.post(`${api}/titulos`, paraEnviar).then(() => {
      message.success('Remessa importada com sucesso!');
      props.history.push('app/visualizar');
    }).catch(() => message.error('Falha na importação da remessa!'));
  };

  return (
    <Button
      onClick={enviar}
      disabled={selecionados.length === 0}
      type="primary"
    >
      Enviar
    </Button>
  );
}

EnviarTitulos.propTypes = {
  selecionados: PropTypes.arrayOf(PropTypes.string).isRequired,
  titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(EnviarTitulos);
