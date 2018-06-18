import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { VisualizarForm, VisualizarTitulosTable } from '.';
import { api } from '../services';

class VisualizarTitulos extends Component {
  state = {
    disableForm: false,
    titulos: [],
  }

  tituloChangeHandle = (key) => {
    const { titulos } = this.state;

    const titulo = titulos.find(el => el.id === key);
    titulo.pago = !titulo.pago;

    this.setState({ titulos }, () => {
      axios.put(`${api}/titulos`, null, {
        params: {
          id: key,
          pago: titulo.pago ? 'true' : 'false',
        },
      }).catch((err) => {
        console.error(err);
        titulo.pago = !titulo.pago;
        this.setState({ titulos });
      });
    });
  }

  tituloDeleteHandle = (key) => {
    const { titulos } = this.state;
    const tituloId = titulos.findIndex(el => el.id === key);
    axios.delete(`${api}/titulos/${key}`)
      .then(() => {
        titulos.splice(tituloId, 1);
        this.setState({ titulos });
      }).catch(err => console.error(err));
  }

  confirmHandle = (dados) => {
    this.setState({ disableForm: true }, () => {
      axios.get(`${api}/titulos/periodo`, {
        params: {
          ...dados,
        },
      }).then((res) => {
        this.setState({ disableForm: false, titulos: res.data });
      });
    });
  }

  render() {
    return (
      <Fragment>
        <VisualizarForm
          onConfirm={this.confirmHandle}
          disabled={this.state.disableForm}
        />
        <VisualizarTitulosTable
          titulos={this.state.titulos}
          onTituloChange={this.tituloChangeHandle}
          onTituloDelete={this.tituloDeleteHandle}
        />
      </Fragment>
    );
  }
}

export default VisualizarTitulos;
