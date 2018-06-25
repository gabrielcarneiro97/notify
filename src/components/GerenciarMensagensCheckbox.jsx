import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class GerenciarMensagensCheckbox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  state = {
    value: false,
  }

  onChange = () => {
    this.setState(prevState => ({ value: !prevState.value }), () => {
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    return (
      <Checkbox
        value={this.state.value}
        onChange={this.onChange}
      >
        Não agendados
      </Checkbox>
    );
  }
}

export default GerenciarMensagensCheckbox;
