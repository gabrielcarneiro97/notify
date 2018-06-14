import React, { Component } from 'react';
import axios from 'axios';

import { api } from '../services';
import { GerenciarMensagensTable } from '.';

class GerenciarMensagens extends Component {
  state = {
    titulos: [],
  };

  componentDidMount() {
    axios
      .get(`${api}/titulos/aberto`)
      .then(res => this.setState({ titulos: res.data }));
  }

  render() {
    return (
      <div><GerenciarMensagensTable titulos={this.state.titulos} /></div>
    );
  }
}

export default GerenciarMensagens;
