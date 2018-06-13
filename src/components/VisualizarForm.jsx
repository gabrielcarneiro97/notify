import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'antd';
import { SelecionarData, PagosCheckbox } from '.';

class VisualizarForm extends React.Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  state = {
    inicio: 0,
    fim: 0,
    soPagos: false,
    soEmAberto: false,
  }


  pagosCheckBoxChangeHandle = ({ pagos, aberto }) => {
    this.setState({ soPagos: pagos, soEmAberto: aberto });
  }

  selecionarDataChangeHandle = (periodoMoment) => {
    const inicio = periodoMoment[0].valueOf();
    const fim = periodoMoment[1].valueOf();

    this.setState({ inicio, fim });
  }

  handleConfirm = () => {
    this.props.onConfirm(this.state);
  }

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        gutter={16}
      >
        <Col>
          <SelecionarData
            onChange={this.selecionarDataChangeHandle}
            disabled={this.state.disableSelecionarData}
          />
        </Col>
        <Col>
          <PagosCheckbox
            onChange={this.pagosCheckBoxChangeHandle}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={this.handleConfirm}
            disabled={this.props.disabled}
          >
            Selecionar
          </Button>
        </Col>
      </Row>
    );
  }
}

export default VisualizarForm;
