import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'antd';

import { api } from '../services';

function EnviarTitulos(props) {
  const { selecionados, titulos } = props;

  const enviar = () => {
    const paraEnviar = titulos.filter(titulo => selecionados.includes(titulo.id));
    axios.post(`${api}/titulos`, paraEnviar).then(() => {
      props.history.push('app/visualizar');
    });
  };

  return (
    <Button onClick={enviar}>
      EnviarTitulos
    </Button>
  );
}

EnviarTitulos.propTypes = {
  selecionados: PropTypes.arrayOf(PropTypes.string).isRequired,
  titulos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(EnviarTitulos);
